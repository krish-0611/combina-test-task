/**
 * Dashboard Data Hooks
 * 
 * React Query hooks for fetching dashboard data with loading and error states.
 */

import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/lib/api/mock-data'
import type {
  Update,
  Metric,
  ApprovalItem,
  PayoutData,
  FunnelStage,
  StatCard,
  PartnerSource,
  User,
} from '@/lib/api/mock-data'

export const useUpdates = () => {
  return useQuery<Update[]>({
    queryKey: ['updates'],
    queryFn: () => mockApi.getUpdates(),
  })
}

export const useMetrics = () => {
  return useQuery<Metric[]>({
    queryKey: ['metrics'],
    queryFn: () => mockApi.getMetrics(),
  })
}

export const useApprovalItems = () => {
  return useQuery<ApprovalItem[]>({
    queryKey: ['approvalItems'],
    queryFn: () => mockApi.getApprovalItems(),
  })
}

export const usePayouts = () => {
  return useQuery<{ increase: string; total: string; data: PayoutData[] }>({
    queryKey: ['payouts'],
    queryFn: () => mockApi.getPayouts(),
  })
}

export const useFunnel = () => {
  return useQuery<{ growth: string; sales: string; stages: FunnelStage[] }>({
    queryKey: ['funnel'],
    queryFn: () => mockApi.getFunnel(),
  })
}

export const useStats = () => {
  return useQuery<StatCard[]>({
    queryKey: ['stats'],
    queryFn: () => mockApi.getStats(),
  })
}

export const useProgramGrowth = () => {
  return useQuery<{ count: string; sources: PartnerSource[] }>({
    queryKey: ['programGrowth'],
    queryFn: () => mockApi.getProgramGrowth(),
  })
}

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => mockApi.getUsers(),
  })
}

export const useMetricDescriptions = () => {
  return useQuery<Record<string, string>>({
    queryKey: ['metricDescriptions'],
    queryFn: () => mockApi.getMetricDescriptions(),
  })
}