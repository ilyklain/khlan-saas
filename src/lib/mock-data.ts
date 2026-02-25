export interface KpiItem {
    title: string;
    value: number;
    prefix?: string;
    suffix?: string;
    change: string;
}

export interface ActivityItem {
    id: string;
    event: string;
    user: string;
    date: string;
    status: string;
}

export const kpiData: KpiItem[] = [
    {
        title: "Revenue",
        value: 48352,
        prefix: "$",
        change: "+12.5%",
    },
    {
        title: "Active Users",
        value: 2841,
        change: "+4.3%",
    },
    {
        title: "Conversion Rate",
        value: 3.6,
        suffix: "%",
        change: "+0.8%",
    },
    {
        title: "Server Uptime",
        value: 99.98,
        suffix: "%",
        change: "+0.01%",
    },
];

export const activityData: ActivityItem[] = [
    {
        id: "act-001",
        event: "Production deployment completed",
        user: "Sarah Chen",
        date: "2 min ago",
        status: "Completed",
    },
    {
        id: "act-002",
        event: "New team member onboarded",
        user: "Marcus Rivera",
        date: "18 min ago",
        status: "Completed",
    },
    {
        id: "act-003",
        event: "Billing cycle processed",
        user: "System",
        date: "1 hr ago",
        status: "Processed",
    },
    {
        id: "act-004",
        event: "API rate limit threshold reached",
        user: "Monitoring",
        date: "2 hr ago",
        status: "Warning",
    },
    {
        id: "act-005",
        event: "Database migration executed",
        user: "Alex Kim",
        date: "4 hr ago",
        status: "Completed",
    },
    {
        id: "act-006",
        event: "SSL certificate renewed",
        user: "System",
        date: "6 hr ago",
        status: "Completed",
    },
];

export const chartData = [
    { x: 0, y: 30 },
    { x: 1, y: 45 },
    { x: 2, y: 38 },
    { x: 3, y: 52 },
    { x: 4, y: 48 },
    { x: 5, y: 61 },
    { x: 6, y: 55 },
    { x: 7, y: 72 },
    { x: 8, y: 68 },
    { x: 9, y: 78 },
    { x: 10, y: 74 },
    { x: 11, y: 85 },
];

export interface TrafficSource {
    source: string;
    visitors: number;
    percentage: number;
}

export interface WeeklyVisitors {
    day: string;
    visitors: number;
}

export interface TopPage {
    path: string;
    views: number;
    uniqueVisitors: number;
    avgDuration: string;
}

export const analyticsKpiData: KpiItem[] = [
    {
        title: "Total Visitors",
        value: 124853,
        change: "+18.2%",
    },
    {
        title: "Page Views",
        value: 389241,
        change: "+9.7%",
    },
    {
        title: "Bounce Rate",
        value: 42.3,
        suffix: "%",
        change: "-2.1%",
    },
    {
        title: "Avg. Session",
        value: 4.2,
        suffix: "m",
        change: "+0.6%",
    },
];

export const trafficSources: TrafficSource[] = [
    { source: "Direct", visitors: 45230, percentage: 36.2 },
    { source: "Organic Search", visitors: 32180, percentage: 25.8 },
    { source: "Referral", visitors: 21450, percentage: 17.2 },
    { source: "Social Media", visitors: 15620, percentage: 12.5 },
    { source: "Email", visitors: 10373, percentage: 8.3 },
];

export const weeklyVisitors: WeeklyVisitors[] = [
    { day: "Mon", visitors: 1420 },
    { day: "Tue", visitors: 1680 },
    { day: "Wed", visitors: 1520 },
    { day: "Thu", visitors: 1890 },
    { day: "Fri", visitors: 2100 },
    { day: "Sat", visitors: 980 },
    { day: "Sun", visitors: 760 },
];

export const pageViewsOverTime = [
    { x: 0, y: 4200 },
    { x: 1, y: 4800 },
    { x: 2, y: 4100 },
    { x: 3, y: 5300 },
    { x: 4, y: 5800 },
    { x: 5, y: 5100 },
    { x: 6, y: 6200 },
    { x: 7, y: 5900 },
    { x: 8, y: 6800 },
    { x: 9, y: 7200 },
    { x: 10, y: 6500 },
    { x: 11, y: 7800 },
];

export const topPages: TopPage[] = [
    { path: "/dashboard", views: 48320, uniqueVisitors: 32100, avgDuration: "3m 24s" },
    { path: "/pricing", views: 31240, uniqueVisitors: 28500, avgDuration: "2m 18s" },
    { path: "/docs/getting-started", views: 24180, uniqueVisitors: 19200, avgDuration: "5m 42s" },
    { path: "/blog/product-update", views: 18920, uniqueVisitors: 16800, avgDuration: "4m 11s" },
    { path: "/changelog", views: 12450, uniqueVisitors: 10300, avgDuration: "1m 56s" },
    { path: "/integrations", views: 9870, uniqueVisitors: 8400, avgDuration: "3m 08s" },
];

export interface Project {
    id: string;
    name: string;
    description: string;
    status: "Active" | "Paused" | "Completed" | "Draft";
    progress: number;
    members: number;
    lastUpdated: string;
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    lastActive: string;
}

export const projectsData: Project[] = [
    {
        id: "proj-001",
        name: "Platform Redesign",
        description: "Complete overhaul of the user-facing dashboard interface",
        status: "Completed",
        progress: 100,
        members: 5,
        lastUpdated: "2 hours ago",
    },
    {
        id: "proj-002",
        name: "API v3 Migration",
        description: "Migrate all endpoints to the new REST API specification",
        status: "Completed",
        progress: 100,
        members: 3,
        lastUpdated: "4 hours ago",
    },
    {
        id: "proj-003",
        name: "Mobile Application",
        description: "Native iOS and Android companion application",
        status: "Paused",
        progress: 1,
        members: 4,
        lastUpdated: "3 days ago",
    },
    {
        id: "proj-004",
        name: "Billing System",
        description: "Stripe integration and subscription management",
        status: "Completed",
        progress: 100,
        members: 2,
        lastUpdated: "1 week ago",
    },
    {
        id: "proj-005",
        name: "Search Infrastructure",
        description: "Elasticsearch cluster deployment and indexing pipeline",
        status: "Active",
        progress: 58,
        members: 3,
        lastUpdated: "12 hours ago",
    },
    {
        id: "proj-006",
        name: "Documentation Portal",
        description: "Developer documentation and interactive API explorer",
        status: "Draft",
        progress: 12,
        members: 2,
        lastUpdated: "5 days ago",
    },
];

export const teamData: TeamMember[] = [
    {
        id: "mem-001",
        name: "Sarah Chen",
        email: "sarah@khlan.io",
        role: "Engineering Lead",
        department: "Engineering",
        lastActive: "Just now",
    },
    {
        id: "mem-002",
        name: "Marcus Rivera",
        email: "marcus@khlan.io",
        role: "Product Designer",
        department: "Design",
        lastActive: "5 min ago",
    },
    {
        id: "mem-003",
        name: "Alex Kim",
        email: "alex@khlan.io",
        role: "Backend Engineer",
        department: "Engineering",
        lastActive: "18 min ago",
    },
    {
        id: "mem-004",
        name: "Priya Patel",
        email: "priya@khlan.io",
        role: "Frontend Engineer",
        department: "Engineering",
        lastActive: "1 hour ago",
    },
    {
        id: "mem-005",
        name: "Jordan Walsh",
        email: "jordan@khlan.io",
        role: "DevOps Engineer",
        department: "Infrastructure",
        lastActive: "3 hours ago",
    },
    {
        id: "mem-006",
        name: "Elena Vasquez",
        email: "elena@khlan.io",
        role: "Product Manager",
        department: "Product",
        lastActive: "2 hours ago",
    },
    {
        id: "mem-007",
        name: "David Okonkwo",
        email: "david@khlan.io",
        role: "QA Engineer",
        department: "Engineering",
        lastActive: "45 min ago",
    },
    {
        id: "mem-008",
        name: "Lina Bergstrom",
        email: "lina@khlan.io",
        role: "Data Analyst",
        department: "Analytics",
        lastActive: "6 hours ago",
    },
];
