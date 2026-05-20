const VTC_ID = "49511-africanlogistics";

export interface TMPPlayerProfile {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  gameServer: string | null;
}

export interface TMPStaffMember {
  name: string;
  role: string;
  avatar: string;
  id: number;
}

export interface TMPEvent {
  id: number;
  title: string;
  game: string;
  bannerUrl: string;
  mapUrl: String;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  server: string;
  url: string;
  attending: number;
  unsure: number;
  vtcAttending: number;
  timestamp: number;
  isAttendingOnly: boolean;
}

export interface TMPPartnerVTC {
  id: number;
  name: string;
  subName: string;
  logoUrl: string;
  coverUrl: string;
  recruiting: boolean;
  website: string | null;
  discord: string | null;
  tmpUrl: string;
}

export async function getLiveFleetStatus(): Promise<TMPPlayerProfile[]> {
  try {
    const vtcRes = await fetch(
      `https://api.truckersmp.com/v2/vtc/${VTC_ID}/members`,
      {
        next: { revalidate: 1800 },
      },
    );

    if (!vtcRes.ok) throw new Error("Failed to fetch TruckersMP roster");
    const vtcData = await vtcRes.json();

    const members = vtcData.response.members || [];

    return members.map((member: any) => {
      return {
        id: member.truckersMPID,
        name: member.username,
        avatar: member.avatar,
        isOnline: false,
        gameServer: null,
      };
    });
  } catch (error) {
    console.error("TruckersMP Sync Error:", error);
    return [];
  }
}

export async function getLivePartnersData(): Promise<TMPPartnerVTC[]> {
  try {
    const res = await fetch(
      `https://api.truckersmp.com/v2/vtc/${VTC_ID}/partners`,
      {
        next: { revalidate: 1800 }, // Cache data for 30 minutes
      },
    );

    if (!res.ok)
      throw new Error(
        "TruckersMP Partners endpoint returned an operational error",
      );
    const data = await res.json();

    const relationships = data.response.partners || [];
    const targetVtcId = parseInt(String(VTC_ID), 10);
    return relationships
      .filter((rel: any) => {
        if (rel.status !== "Accepted") return false;

        const receiverId = parseInt(String(rel.receiver?.id), 10);
        const isWeAreReceiver = receiverId === targetVtcId;

        const partnerData = isWeAreReceiver ? rel.sender : rel.receiver;

        if (!partnerData) {
          return false;
        }

        return true;
      })
      .map((rel: any) => {
        const receiverId = parseInt(String(rel.receiver.id), 10);
        const isWeAreReceiver = receiverId === targetVtcId;
        const partnerData = isWeAreReceiver ? rel.sender : rel.receiver;

        return {
          id: partnerData.id,
          name: partnerData.name,
          subName: partnerData.sub_name || "Official Partner",
          logoUrl: `https://static.truckersmp.com/images/vtc/logo/${partnerData.logo}`,
          coverUrl: partnerData.cover
            ? `https://static.truckersmp.com/images/vtc/cover/${partnerData.cover}`
            : "/hero-bg.jpg",
          recruiting: partnerData.recruitment_status === 1,
          website: partnerData.website || null,
          discord: partnerData.discord || null,
          tmpUrl: `https://truckersmp.com/vtc/${partnerData.id}`,
        };
      });
  } catch (error) {
    console.error(
      "Failed to fetch official TruckersMP alliance roster:",
      error,
    );
    return [];
  }
}

export async function getVtcStaff(): Promise<TMPStaffMember[]> {
  try {
    const res = await fetch(
      `https://api.truckersmp.com/v2/vtc/${VTC_ID}/members`,
      {
        next: { revalidate: 1800 },
      },
    );

    if (!res.ok)
      throw new Error(
        "TruckersMP Members endpoint returned an operational error",
      );
    const data = await res.json();

    const members = data.response.members || [];

    const excludedRoles = ["driver", "african trainee"];

    const staffList = members
      .filter((member: any) => {
        const roleName = (member.role || "").toLowerCase();
        return roleName && !excludedRoles.includes(roleName);
      })
      .map((member: any) => ({
        name: member.username,
        role: member.role,
        avatar: member.avatar,
        id: member.user_id,
      }));

    return staffList.sort((a: any, b: any) => {
      if (a.role.toUpperCase() === "OWNER") return -1;
      if (b.role.toUpperCase() === "OWNER") return 1;
      return 0;
    });
  } catch (error) {
    console.error(
      "Failed to parse TruckersMP roster for staff mapping:",
      error,
    );
    return [];
  }
}

export async function getUpcomingVtcEvents(): Promise<TMPEvent[]> {
  try {
    const [hostedRes, attendingRes] = await Promise.all([
      fetch(`https://api.truckersmp.com/v2/vtc/${VTC_ID}/events`, {
        next: { revalidate: 1800 },
      }),
      fetch(`https://api.truckersmp.com/v2/vtc/${VTC_ID}/events/attending`, {
        next: { revalidate: 1800 },
      }),
    ]);

    const hostedData = hostedRes.ok ? await hostedRes.json() : { response: [] };
    const attendingData = attendingRes.ok
      ? await attendingRes.json()
      : { response: [] };

    const rawHosted = hostedData.response || [];
    const rawAttending = attendingData.response || [];

    const now = Date.now();
    const uniqueEventsMap = new Map<number, TMPEvent>();

    const parseAndMapEvent = (event: any, isAttendingOnly: boolean) => {
      if (!event || !event.id) return;

      const eventTimestamp = new Date(event.start_at).getTime();
      if (eventTimestamp < now) return;

      uniqueEventsMap.set(event.id, {
        id: event.id,
        title: event.name,
        departure: event.departure?.city || "Custom Location",
        arrival: event.arrive?.city || "Custom Location",
        date: new Date(event.start_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: new Date(event.start_at).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
        server: event.server?.name || "Simulation Server",
        url: `https://truckersmp.com/events/${event.id}`,
        timestamp: eventTimestamp,
        isAttendingOnly,
        game: event.game,
        bannerUrl: event.banner,
        mapUrl: event.map,
        attending: event.attendances?.confirmed,
        unsure: event.attendances?.unsure,
        vtcAttending: event.attendances?.vtcs,
      });
    };

    rawAttending.forEach((item: any) => parseAndMapEvent(item, true));
    rawHosted.forEach((item: any) => parseAndMapEvent(item, false));

    return Array.from(uniqueEventsMap.values())
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(0, 4);
  } catch (error) {
    console.error(
      "Failed to compile aggregated TruckersMP events timeline:",
      error,
    );
    return [];
  }
}
