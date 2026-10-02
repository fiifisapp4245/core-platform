/** Typed mock data layer — swap each export for a real API call when ready */

// ─── Organization ──────────────────────────────────────────────────────────

export type OrgData = {
  id: string
  name: string
  legalName: string
  description: string
  industry: string
  employeeCount: string
  phone: string
  email: string
  website: string
  taxId: string
  address: {
    street: string
    city: string
    region: string
    country: string
    postalCode: string
  }
  initials: string
  plan: string
  logoUrl?: string
  updatedAt: string
  updatedBy: string
}

export const orgData: OrgData = {
  id: "org_mensah",
  name: "Mensah Retail Group",
  legalName: "Mensah Retail Group Ltd",
  description:
    "A multi-branch retail and financial services business operating across Greater Accra and Ashanti regions. We run a network of mini-marts, a microcredit portfolio, and a growing e-commerce presence.",
  industry: "Retail & Financial Services",
  employeeCount: "11–50",
  phone: "+233 30 296 8400",
  email: "admin@mensahretail.com",
  website: "https://mensahretail.com",
  taxId: "C0012345678",
  address: {
    street: "14 Independence Avenue",
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
    postalCode: "GA-123-4567",
  },
  initials: "MR",
  plan: "TroveSuite Business",
  updatedAt: "2026-09-28T14:30:00Z",
  updatedBy: "Kwame Mensah",
}

// ─── Users ─────────────────────────────────────────────────────────────────

export type UserStatus = "Active" | "Invited" | "Suspended"

export type Member = {
  id: string
  name: string
  email: string
  role: string
  roleId: string
  groups: string[]
  locations: string[]
  apps: string[]
  status: UserStatus
  lastSignIn: string
  joinedAt: string
}

export const members: Member[] = [
  {
    id: "u1",
    name: "Kwame Mensah",
    email: "kwame@mensahretail.com",
    role: "Owner",
    roleId: "owner",
    groups: ["management"],
    locations: ["loc_osu", "loc_tema", "loc_kumasi"],
    apps: ["mystoreguard", "loandrift"],
    status: "Active",
    lastSignIn: "2026-10-02T08:12:00Z",
    joinedAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "u2",
    name: "Efua Asante",
    email: "efua@mensahretail.com",
    role: "Admin",
    roleId: "admin",
    groups: ["management", "osu-team"],
    locations: ["loc_osu"],
    apps: ["mystoreguard"],
    status: "Active",
    lastSignIn: "2026-10-02T07:48:00Z",
    joinedAt: "2025-03-02T00:00:00Z",
  },
  {
    id: "u3",
    name: "Yaw Boateng",
    email: "yaw@mensahretail.com",
    role: "Loan Officer",
    roleId: "loan-officer",
    groups: ["loans-team"],
    locations: ["loc_osu"],
    apps: ["loandrift"],
    status: "Active",
    lastSignIn: "2026-10-01T16:22:00Z",
    joinedAt: "2025-04-15T00:00:00Z",
  },
  {
    id: "u4",
    name: "Abena Owusu",
    email: "abena@mensahretail.com",
    role: "Cashier",
    roleId: "cashier",
    groups: ["osu-team"],
    locations: ["loc_osu"],
    apps: ["mystoreguard"],
    status: "Active",
    lastSignIn: "2026-10-01T18:05:00Z",
    joinedAt: "2025-06-01T00:00:00Z",
  },
  {
    id: "u5",
    name: "Kofi Darko",
    email: "kofi@mensahretail.com",
    role: "Store Manager",
    roleId: "store-manager",
    groups: ["tema-team"],
    locations: ["loc_tema"],
    apps: ["mystoreguard"],
    status: "Active",
    lastSignIn: "2026-09-30T11:40:00Z",
    joinedAt: "2025-05-20T00:00:00Z",
  },
  {
    id: "u6",
    name: "Akua Sarpong",
    email: "akua@mensahretail.com",
    role: "Loan Officer",
    roleId: "loan-officer",
    groups: ["loans-team"],
    locations: ["loc_osu"],
    apps: ["loandrift"],
    status: "Invited",
    lastSignIn: "",
    joinedAt: "2026-09-28T00:00:00Z",
  },
  {
    id: "u7",
    name: "Nana Bediako",
    email: "nana@mensahretail.com",
    role: "Cashier",
    roleId: "cashier",
    groups: ["kumasi-team"],
    locations: ["loc_kumasi"],
    apps: ["mystoreguard"],
    status: "Suspended",
    lastSignIn: "2026-08-10T09:12:00Z",
    joinedAt: "2025-07-01T00:00:00Z",
  },
]

export type Invitation = {
  id: string
  email: string
  role: string
  sentAt: string
  expiresAt: string
}

export const invitations: Invitation[] = [
  {
    id: "inv1",
    email: "akua@mensahretail.com",
    role: "Loan Officer",
    sentAt: "2026-09-28T10:00:00Z",
    expiresAt: "2026-10-05T10:00:00Z",
  },
  {
    id: "inv2",
    email: "ama.darko@mensahretail.com",
    role: "Cashier",
    sentAt: "2026-09-30T14:00:00Z",
    expiresAt: "2026-10-07T14:00:00Z",
  },
]

// ─── Groups ────────────────────────────────────────────────────────────────

export type Group = {
  id: string
  name: string
  description: string
  memberCount: number
  roles: string[]
  locationIds: string[]
  createdAt: string
}

export const groups: Group[] = [
  {
    id: "management",
    name: "Management",
    description: "Owners and admins with full platform access.",
    memberCount: 2,
    roles: ["Owner", "Admin"],
    locationIds: ["loc_osu", "loc_tema", "loc_kumasi"],
    createdAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "loans-team",
    name: "Loans Team",
    description: "Loan officers who manage the LoanDrift portfolio.",
    memberCount: 2,
    roles: ["Loan Officer"],
    locationIds: ["loc_osu"],
    createdAt: "2025-04-15T00:00:00Z",
  },
  {
    id: "osu-team",
    name: "Osu Branch",
    description: "Staff assigned to the Osu Oxford Street branch.",
    memberCount: 3,
    roles: ["Cashier", "Admin"],
    locationIds: ["loc_osu"],
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "tema-team",
    name: "Tema Branch",
    description: "Staff assigned to the Tema Community 1 branch.",
    memberCount: 1,
    roles: ["Store Manager", "Cashier"],
    locationIds: ["loc_tema"],
    createdAt: "2025-05-20T00:00:00Z",
  },
  {
    id: "kumasi-team",
    name: "Kumasi Branch",
    description: "Staff assigned to the Kumasi Adum branch.",
    memberCount: 1,
    roles: ["Cashier"],
    locationIds: ["loc_kumasi"],
    createdAt: "2025-07-01T00:00:00Z",
  },
]

// ─── Roles ─────────────────────────────────────────────────────────────────

export type RoleType = "System" | "Custom"

export type PermissionMatrix = {
  [app: string]: {
    [permission: string]: boolean
  }
}

export type Role = {
  id: string
  name: string
  type: RoleType
  description: string
  userCount: number
  isReadOnly: boolean
  permissions: PermissionMatrix
}

export const allPermissions: Record<string, string[]> = {
  "Core Platform": [
    "Manage organization",
    "Manage users",
    "Manage roles",
    "Manage locations",
    "View audit logs",
    "Manage billing",
  ],
  MyStoreGuard: [
    "View inventory",
    "Manage inventory",
    "Process sales",
    "View reports",
    "Manage settings",
  ],
  LoanDrift: [
    "View loans",
    "Create loans",
    "Approve loans",
    "Manage repayments",
    "View reports",
  ],
}

export const roles: Role[] = [
  {
    id: "owner",
    name: "Owner",
    type: "System",
    description: "Full access to all apps and settings. Cannot be modified.",
    userCount: 1,
    isReadOnly: true,
    permissions: {
      "Core Platform": Object.fromEntries(
        allPermissions["Core Platform"].map((p) => [p, true])
      ),
      MyStoreGuard: Object.fromEntries(
        allPermissions.MyStoreGuard.map((p) => [p, true])
      ),
      LoanDrift: Object.fromEntries(
        allPermissions.LoanDrift.map((p) => [p, true])
      ),
    },
  },
  {
    id: "admin",
    name: "Admin",
    type: "System",
    description:
      "Can manage users, settings, and all app data. Cannot change billing or delete the organization.",
    userCount: 1,
    isReadOnly: true,
    permissions: {
      "Core Platform": {
        "Manage organization": true,
        "Manage users": true,
        "Manage roles": false,
        "Manage locations": true,
        "View audit logs": true,
        "Manage billing": false,
      },
      MyStoreGuard: Object.fromEntries(
        allPermissions.MyStoreGuard.map((p) => [p, true])
      ),
      LoanDrift: Object.fromEntries(
        allPermissions.LoanDrift.map((p) => [p, true])
      ),
    },
  },
  {
    id: "store-manager",
    name: "Store Manager",
    type: "Custom",
    description: "Manages a single branch: inventory, POS and staff reports.",
    userCount: 1,
    isReadOnly: false,
    permissions: {
      "Core Platform": {
        "Manage organization": false,
        "Manage users": false,
        "Manage roles": false,
        "Manage locations": false,
        "View audit logs": false,
        "Manage billing": false,
      },
      MyStoreGuard: {
        "View inventory": true,
        "Manage inventory": true,
        "Process sales": true,
        "View reports": true,
        "Manage settings": false,
      },
      LoanDrift: Object.fromEntries(
        allPermissions.LoanDrift.map((p) => [p, false])
      ),
    },
  },
  {
    id: "cashier",
    name: "Cashier",
    type: "Custom",
    description: "Can process sales and view own transactions only.",
    userCount: 2,
    isReadOnly: false,
    permissions: {
      "Core Platform": Object.fromEntries(
        allPermissions["Core Platform"].map((p) => [p, false])
      ),
      MyStoreGuard: {
        "View inventory": true,
        "Manage inventory": false,
        "Process sales": true,
        "View reports": false,
        "Manage settings": false,
      },
      LoanDrift: Object.fromEntries(
        allPermissions.LoanDrift.map((p) => [p, false])
      ),
    },
  },
  {
    id: "loan-officer",
    name: "Loan Officer",
    type: "Custom",
    description: "Creates and reviews loan applications, logs repayments.",
    userCount: 2,
    isReadOnly: false,
    permissions: {
      "Core Platform": Object.fromEntries(
        allPermissions["Core Platform"].map((p) => [p, false])
      ),
      MyStoreGuard: Object.fromEntries(
        allPermissions.MyStoreGuard.map((p) => [p, false])
      ),
      LoanDrift: {
        "View loans": true,
        "Create loans": true,
        "Approve loans": false,
        "Manage repayments": true,
        "View reports": true,
      },
    },
  },
]

// ─── Locations ─────────────────────────────────────────────────────────────

export type LocationType = "Branch" | "Warehouse" | "Office" | "Restaurant"
export type LocationStatus = "Active" | "Inactive"

export type Location = {
  id: string
  name: string
  address: string
  city: string
  region: string
  type: LocationType
  status: LocationStatus
  isDefault: boolean
  contactPerson: string
  phone: string
  email: string
  timezone: string
  userCount: number
  legalEntity: string
  operatingHours: string
}

export const locations: Location[] = [
  {
    id: "loc_osu",
    name: "Osu Oxford Street",
    address: "34 Oxford Street",
    city: "Accra",
    region: "Greater Accra",
    type: "Branch",
    status: "Active",
    isDefault: true,
    contactPerson: "Efua Asante",
    phone: "+233 30 296 0100",
    email: "osu@mensahretail.com",
    timezone: "Africa/Accra",
    userCount: 5,
    legalEntity: "Mensah Retail Group Ltd",
    operatingHours: "Mon–Sat 8:00–20:00",
  },
  {
    id: "loc_tema",
    name: "Tema Community 1",
    address: "15 Community 1 Road",
    city: "Tema",
    region: "Greater Accra",
    type: "Branch",
    status: "Active",
    isDefault: false,
    contactPerson: "Kofi Darko",
    phone: "+233 30 220 1122",
    email: "tema@mensahretail.com",
    timezone: "Africa/Accra",
    userCount: 2,
    legalEntity: "Mensah Retail Group Ltd",
    operatingHours: "Mon–Sat 8:00–19:00",
  },
  {
    id: "loc_kumasi",
    name: "Kumasi Adum",
    address: "8 Adum Main Road",
    city: "Kumasi",
    region: "Ashanti",
    type: "Branch",
    status: "Active",
    isDefault: false,
    contactPerson: "Nana Bediako",
    phone: "+233 32 202 8844",
    email: "kumasi@mensahretail.com",
    timezone: "Africa/Accra",
    userCount: 1,
    legalEntity: "Mensah Retail Group Ltd",
    operatingHours: "Mon–Sat 7:00–19:00",
  },
  {
    id: "loc_warehouse",
    name: "Accra Central Warehouse",
    address: "Industrial Area, Ring Road",
    city: "Accra",
    region: "Greater Accra",
    type: "Warehouse",
    status: "Active",
    isDefault: false,
    contactPerson: "Kwame Mensah",
    phone: "+233 30 295 5500",
    email: "warehouse@mensahretail.com",
    timezone: "Africa/Accra",
    userCount: 0,
    legalEntity: "Mensah Retail Group Ltd",
    operatingHours: "Mon–Fri 7:00–17:00",
  },
]

// ─── Payment Methods ────────────────────────────────────────────────────────

export type PaymentMethodType = "card" | "momo"
export type MomoProvider = "MTN MoMo" | "Telecel Cash" | "AT Money"

export type PaymentMethod = {
  id: string
  type: PaymentMethodType
  isDefault: boolean
  status: "active" | "failed"
  // card fields
  brand?: string
  last4?: string
  expiry?: string
  // momo fields
  provider?: MomoProvider
  phone?: string
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm_card",
    type: "card",
    isDefault: true,
    status: "active",
    brand: "Visa",
    last4: "4242",
    expiry: "08/28",
  },
  {
    id: "pm_momo",
    type: "momo",
    isDefault: false,
    status: "active",
    provider: "MTN MoMo",
    phone: "+233 55 123 4567",
  },
]

// ─── Invoices (extended) ────────────────────────────────────────────────────

export type InvoiceStatus = "Upcoming" | "Paid" | "Failed" | "Refunded"

export type Invoice = {
  id: string
  date: string
  dueDate: string
  amount: number
  status: InvoiceStatus
  paymentMethodId: string
  downloadUrl?: string
}

export const invoices: Invoice[] = [
  {
    id: "INV-2026-010",
    date: "2026-10-15",
    dueDate: "2026-10-15",
    amount: 1450,
    status: "Upcoming",
    paymentMethodId: "pm_card",
  },
  {
    id: "INV-2026-009",
    date: "2026-09-15",
    dueDate: "2026-09-15",
    amount: 1450,
    status: "Paid",
    paymentMethodId: "pm_card",
    downloadUrl: "#",
  },
  {
    id: "INV-2026-008",
    date: "2026-08-15",
    dueDate: "2026-08-15",
    amount: 1450,
    status: "Paid",
    paymentMethodId: "pm_card",
    downloadUrl: "#",
  },
  {
    id: "INV-2026-007",
    date: "2026-07-15",
    dueDate: "2026-07-15",
    amount: 1200,
    status: "Paid",
    paymentMethodId: "pm_card",
    downloadUrl: "#",
  },
  {
    id: "INV-2026-006",
    date: "2026-06-15",
    dueDate: "2026-06-15",
    amount: 1200,
    status: "Failed",
    paymentMethodId: "pm_card",
    downloadUrl: "#",
  },
]

// ─── Audit Logs ─────────────────────────────────────────────────────────────

export type AuditLog = {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  app: string
  ip: string
  device: string
  before?: Record<string, unknown>
  after?: Record<string, unknown>
}

export const auditLogs: AuditLog[] = [
  {
    id: "al1",
    timestamp: "2026-10-02T08:12:00Z",
    user: "Kwame Mensah",
    action: "User invited",
    resource: "akua@mensahretail.com",
    app: "Core Platform",
    ip: "197.251.0.1",
    device: "Chrome on macOS",
    after: { email: "akua@mensahretail.com", role: "Loan Officer" },
  },
  {
    id: "al2",
    timestamp: "2026-10-01T16:22:00Z",
    user: "Yaw Boateng",
    action: "Loan approved",
    resource: "LN-2291",
    app: "LoanDrift",
    ip: "197.251.0.2",
    device: "Firefox on Windows",
    before: { status: "Pending" },
    after: { status: "Approved" },
  },
  {
    id: "al3",
    timestamp: "2026-10-01T14:00:00Z",
    user: "Efua Asante",
    action: "Role changed",
    resource: "Abena Owusu",
    app: "Core Platform",
    ip: "197.251.0.3",
    device: "Chrome on Windows",
    before: { role: "Admin" },
    after: { role: "Cashier" },
  },
  {
    id: "al4",
    timestamp: "2026-09-30T11:40:00Z",
    user: "Kofi Darko",
    action: "Sale processed",
    resource: "POS-TEM-0094",
    app: "MyStoreGuard",
    ip: "197.251.0.4",
    device: "Chrome on Android",
    after: { amount: "GH₵ 320.00", items: 4 },
  },
  {
    id: "al5",
    timestamp: "2026-09-30T09:00:00Z",
    user: "Kwame Mensah",
    action: "Payment method added",
    resource: "MTN MoMo ···4567",
    app: "Core Platform",
    ip: "197.251.0.1",
    device: "Chrome on macOS",
  },
  {
    id: "al6",
    timestamp: "2026-09-29T15:30:00Z",
    user: "Kwame Mensah",
    action: "Location created",
    resource: "Accra Central Warehouse",
    app: "Core Platform",
    ip: "197.251.0.1",
    device: "Chrome on macOS",
    after: { name: "Accra Central Warehouse", type: "Warehouse" },
  },
  {
    id: "al7",
    timestamp: "2026-09-28T10:00:00Z",
    user: "Kwame Mensah",
    action: "Organization updated",
    resource: "Mensah Retail Group",
    app: "Core Platform",
    ip: "197.251.0.1",
    device: "Chrome on macOS",
    before: { description: "Old description" },
    after: { description: "Updated description" },
  },
  {
    id: "al8",
    timestamp: "2026-09-27T08:45:00Z",
    user: "Efua Asante",
    action: "User suspended",
    resource: "Nana Bediako",
    app: "Core Platform",
    ip: "197.251.0.3",
    device: "Chrome on Windows",
    before: { status: "Active" },
    after: { status: "Suspended" },
  },
]

// ─── Notifications ──────────────────────────────────────────────────────────

export type NotificationType = "info" | "warning" | "success" | "error"

export type AppNotification = {
  id: string
  title: string
  message: string
  type: NotificationType
  app: string
  read: boolean
  timestamp: string
  href?: string
}

export const notifications: AppNotification[] = [
  {
    id: "n1",
    title: "LoanDrift trial ending soon",
    message: "Your LoanDrift trial ends in 12 days. Upgrade to keep your data.",
    type: "warning",
    app: "LoanDrift",
    read: false,
    timestamp: "2026-10-02T06:00:00Z",
    href: "/billing/subscriptions",
  },
  {
    id: "n2",
    title: "Invoice paid",
    message: "Invoice INV-2026-009 for GH₵ 1,450.00 was paid successfully.",
    type: "success",
    app: "Core Platform",
    read: false,
    timestamp: "2026-09-15T12:00:00Z",
    href: "/billing/invoices",
  },
  {
    id: "n3",
    title: "7 products below reorder point",
    message: "Reorder items in MyStoreGuard to avoid stockouts.",
    type: "warning",
    app: "MyStoreGuard",
    read: true,
    timestamp: "2026-10-02T01:00:00Z",
    href: "#",
  },
  {
    id: "n4",
    title: "Akua Sarpong accepted your invite",
    message: "Akua joined as Loan Officer and can now access LoanDrift.",
    type: "info",
    app: "Core Platform",
    read: true,
    timestamp: "2026-09-30T09:12:00Z",
    href: "/users",
  },
  {
    id: "n5",
    title: "Payment method failed",
    message: "The June invoice payment failed. Check your Visa card details.",
    type: "error",
    app: "Core Platform",
    read: true,
    timestamp: "2026-06-15T14:30:00Z",
    href: "/billing/payment-methods",
  },
]

export type NotificationPreference = {
  eventType: string
  app: string
  inApp: boolean
  email: boolean
}

export const notificationPreferences: NotificationPreference[] = [
  { eventType: "Invoice paid", app: "Core Platform", inApp: true, email: true },
  { eventType: "Invoice failed", app: "Core Platform", inApp: true, email: true },
  { eventType: "User invited", app: "Core Platform", inApp: true, email: false },
  { eventType: "User joined", app: "Core Platform", inApp: true, email: true },
  { eventType: "Role changed", app: "Core Platform", inApp: false, email: false },
  { eventType: "Trial ending", app: "Core Platform", inApp: true, email: true },
  { eventType: "Low stock alert", app: "MyStoreGuard", inApp: true, email: false },
  { eventType: "Daily sales summary", app: "MyStoreGuard", inApp: false, email: true },
  { eventType: "Loan approved", app: "LoanDrift", inApp: true, email: false },
  { eventType: "Repayment due", app: "LoanDrift", inApp: true, email: true },
  { eventType: "Loan overdue", app: "LoanDrift", inApp: true, email: true },
]

// ─── Guide content ──────────────────────────────────────────────────────────

export type GuideArticle = {
  id: string
  title: string
  category: string
  app: string
  excerpt: string
  content: string
}

export const guideArticles: GuideArticle[] = [
  {
    id: "create-org",
    title: "Creating your organization",
    category: "Getting started",
    app: "Core Platform",
    excerpt: "Set up your organization profile, logo, and legal details.",
    content: `## Creating your organization\n\nWhen you first sign in to TroveSuite, you'll be prompted to create an organization. This is the top-level container for all your apps, users, and billing.\n\n### What to fill in\n\n- **Organization name** — The name your team will recognize\n- **Legal name** — Used on invoices and tax documents\n- **Tax ID** — Your Ghana Revenue Authority TIN\n- **Address** — Your registered business address\n\n### Changing your organization later\n\nGo to **Organization → Company details** to update any of these fields. Changes take effect immediately for your team.`,
  },
  {
    id: "invite-users",
    title: "Inviting users",
    category: "Users and access",
    app: "Core Platform",
    excerpt: "Add teammates and assign them roles and app access.",
    content: `## Inviting users\n\nGo to **Users** and enter the email address of the person you want to invite. Choose their role and which apps they should access.\n\n### Roles\n\n- **Owner** — Full access, can delete the organization\n- **Admin** — Can manage users and settings\n- **Custom roles** — You can create any role with the exact permissions you need\n\n### Pending invitations\n\nPending invitations appear in the **Invitations** tab. You can resend or revoke them at any time.`,
  },
  {
    id: "create-roles",
    title: "Creating custom roles",
    category: "Users and access",
    app: "Core Platform",
    excerpt: "Define exactly what each role can see and do.",
    content: `## Creating custom roles\n\nGo to **Roles → Custom roles → Create role**. Give the role a name and description, then use the permission matrix to toggle individual permissions per app.\n\n### System roles\n\nOwner and Admin are system roles — they cannot be edited. To customize access levels, create a new custom role.\n\n### Assigning roles\n\nRoles are assigned when you invite a user or from the user's detail page.`,
  },
  {
    id: "add-locations",
    title: "Adding locations",
    category: "Getting started",
    app: "Core Platform",
    excerpt: "Set up your branches, warehouses, and offices.",
    content: `## Adding locations\n\nGo to **Locations → Add location**. Each location needs a name, address, and a contact person.\n\n### Default location\n\nOne location is always your default. This is the location used when app-level defaults are needed (e.g. the opening POS session in MyStoreGuard). You can change the default at any time — the change takes effect immediately.`,
  },
  {
    id: "subscribe-app",
    title: "Subscribing to an app",
    category: "Getting started",
    app: "Core Platform",
    excerpt: "Activate TroveSuite apps for your organization.",
    content: `## Subscribing to an app\n\nGo to **Apps → Discover** and click **Start free trial** on any available app. Trial periods last 14 days.\n\nAfter the trial, go to **Billing → Subscriptions** to upgrade to a paid plan. Choose your plan and confirm payment via Mobile Money or card.`,
  },
  {
    id: "pay-momo",
    title: "Paying with Mobile Money",
    category: "Billing and payments",
    app: "Core Platform",
    excerpt: "Add an MTN MoMo, Telecel Cash, or AT Money account as a payment method.",
    content: `## Paying with Mobile Money\n\nGo to **Billing → Payment methods → Add method → Mobile Money**.\n\n1. Choose your provider: MTN MoMo, Telecel Cash, or AT Money.\n2. Enter your registered MoMo phone number.\n3. Approve the payment prompt that arrives on your phone.\n\nOnce approved, your MoMo account is saved and will be charged on the next billing date.`,
  },
]
