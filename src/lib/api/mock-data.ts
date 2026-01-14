/**
 * Mock Data for Dashboard
 * 
 * This file contains all mock data structures and functions
 * that simulate API responses with loading delays.
 */

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface Update {
  id: string
  source: string
  icon: string
  message: string
}

export interface Metric {
  id: string
  label: string
  value: string
  highlight?: boolean
}

export interface ApprovalItem {
  id: string
  partner: string
  icon: string
  action: string
  timeAgo: string
}

export interface PayoutData {
  month: string
  value: number
  isRecent?: boolean
  isIgnored?: boolean
  isActive?: boolean
}

export interface FunnelStage {
  label: string
  value: number
  color: string
}

export interface StatCard {
  title: string
  value: string
  growth: string
  description: string
}

export interface PartnerSource {
  name: string
  count: number
  color: string
}

export interface User {
  id: string
  name: string
  avatar: string
  badge?: number
}

export interface MetricDescription {
  label: string
  description: string
}

/**
 * Mock API Functions
 */
export const mockApi = {
  async getUpdates(): Promise<Update[]> {
    await delay(800)
    return [
      { id: '1', source: 'CreativeDir', icon: 'CD', message: 'Q4 Brand Assets are live...' },
      { id: '2', source: 'Editor', icon: 'ED', message: "First draft of the 'Unboxi..." },
      { id: '3', source: 'MediaBuyer', icon: 'MB', message: 'ROAS is up 15% on the n...' },
      { id: '4', source: 'Sarah J.', icon: 'SJ', message: 'Velto Inc. approved the n...' },
      { id: '5', source: 'MediaTeam', icon: 'MT', message: 'Premium inventory secur...' },
      { id: '6', source: 'SocialBot', icon: 'SB', message: 'Instagram engagement u...' },
    ]
  },

  async getMetrics(): Promise<Metric[]> {
    await delay(600)
    return [
      { id: '1', label: 'Performance', value: '$334.4k' },
      { id: '2', label: 'Social', value: '24M Views' },
      { id: '3', label: 'Partners', value: '400 rebates', highlight: true },
      { id: '4', label: 'Campaigns', value: '1500 review' },
      { id: '5', label: 'Content', value: '30k assets' },
      { id: '6', label: 'Inbox', value: '40 unreads' },
      { id: '7', label: 'Operations', value: '12 Active' },
      { id: '8', label: 'Expenses', value: '20 requests' },
    ]
  },

  async getApprovalItems(): Promise<ApprovalItem[]> {
    await delay(700)
    return [
      { id: '1', partner: 'UrbanFit Life', icon: 'U', action: 'Approve Content', timeAgo: '2h ago' },
      { id: '2', partner: 'TechSavvy Mom', icon: 'T', action: 'Approve Commission', timeAgo: '5h ago' },
      { id: '3', partner: 'Daily Gadgets', icon: 'D', action: 'Validate Lead', timeAgo: '1d ago' },
      { id: '4', partner: 'Yoga with Jen', icon: 'Y', action: 'Approve Invoice', timeAgo: '1d ago' },
    ]
  },

  async getPayouts(): Promise<{ increase: string; total: string; data: PayoutData[] }> {
    await delay(650)
    return {
      increase: '+350%',
      total: '$2.5 m',
      data: [
        { month: '01.23', value: 35, isIgnored: false },
        { month: '02.23', value: 55, isIgnored: false },
        { month: '03.23', value: 35, isIgnored: false },
        { month: '05.23', value: 65, isIgnored: true },
        { month: '06.23', value: 75, isIgnored: true },
        { month: '07.23', value: 60, isIgnored: true },
        { month: '08.23', value: 20, isIgnored: true },
        { month: '04.23', value: 85, isIgnored: true },
        { month: '09.23', value: 78, isIgnored: false, isActive: true },
      ],
    }
  },

  async getFunnel(): Promise<{ growth: string; sales: string; stages: FunnelStage[] }> {
    await delay(750)
    return {
      growth: '+37%',
      sales: '6,653 growth in closed sales',
      stages: [
        { label: 'TOTAL MARKET', value: 142382, color: 'bg-foreground/30' },
        { label: 'PROSPECTS', value: 87027, color: 'bg-foreground/40' },
        { label: 'LEADS', value: 48027, color: 'bg-foreground/50' },
        { label: 'SALES', value: 32027, color: 'bg-foreground' },
      ],
    }
  },

  async getStats(): Promise<StatCard[]> {
    await delay(500)
    return [
      { title: 'Outreached', value: '1,240', growth: '+15%', description: ' Partners Contacted' },
      { title: 'Onboarded', value: '85', growth: '+8%', description: ' Active in Program' },
      { title: 'Awaiting Deliverables', value: '12', growth: '', description: ' Pending Content' },
    ]
  },

  async getProgramGrowth(): Promise<{ count: string; sources: PartnerSource[] }> {
    await delay(600)
    return {
      count: '+124',
      sources: [
        { name: 'Levanta', count: 45, color: 'bg-foreground' },
        { name: 'Impact', count: 32, color: 'bg-muted-foreground/60' },
        { name: 'Social Snowball', count: 28, color: 'bg-muted-foreground/40' },
        { name: 'Shopify Collabs', count: 19, color: 'bg-muted-foreground/20' },
      ],
    }
  },

  async getUsers(): Promise<User[]> {
    await delay(550)
    return [
      { id: '1', name: 'User 1', avatar: '/images/user-1.jpg', badge: 2 },
      { id: '2', name: 'User 2', avatar: '/images/user-2.jpg', badge: 5 },
      { id: '3', name: 'User 3', avatar: '/images/user-3.jpg', badge: 1 },
      { id: '4', name: 'User 4', avatar: '/images/user-4.jpg' },
      { id: '5', name: 'User 5', avatar: '/images/user-5.jpg', badge: 3 },
      { id: '6', name: 'User 6', avatar: '/images/user-6.jpg' },
      { id: '7', name: 'User 7', avatar: '/images/user-7.jpg' },
      { id: '8', name: 'User 8', avatar: '/images/user-8.jpg' },
      { id: '9', name: 'User 9', avatar: '/images/user-9.jpg' },
      { id: '10', name: 'User 10', avatar: '/images/user-10.jpg' },
      { id: '12', name: 'User 12', avatar: '/images/user-12.jpg' },
    ]
  },

  async getMetricDescriptions(): Promise<Record<string, string>> {
    await delay(400)
    return {
      'Performance': 'Revenue and ROI metrics',
      'Social': 'Social media engagement',
      'Partners': 'Active partner count',
      'Campaigns': 'Campaign reviews pending',
      'Content': 'Total content assets',
      'Inbox': 'Unread messages',
      'Operations': 'Active operations',
      'Expenses': 'Expense requests',
    }
  },
}
