import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const diffInMs = now.getTime() - past.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInSeconds < 60) {
    return "Agora"
  }

  if (diffInMinutes < 60) {
    return `Há ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"}`
  }

  if (diffInHours < 24) {
    return `Há ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`
  }

  return `Há ${diffInDays} ${diffInDays === 1 ? "dia" : "dias"}`
}

import type { Idea, User } from "@/types"

export interface UserStats {
  totalAdmins: number
  totalMembers: number
}

export function calculateUserStats(users: User[]): UserStats {
  const totalAdmins = users.filter(
    (u) => u.role === "admin" || u.role === "owner"
  ).length
  const totalMembers = users.length - totalAdmins

  return {
    totalAdmins,
    totalMembers,
  }
}

export type SortOption = "recent" | "mine" | "votes" | "comments" | "oldest"

export interface IdeaStats {
  totalIdeas: number
  totalComments: number
  totalVotes: number
}

export function calculateIdeaStats(ideas: Idea[]): IdeaStats {
  const totalIdeas = ideas.length
  const totalComments = ideas.reduce(
    (acc, idea) => acc + (idea.comments?.length || 0),
    0
  )
  const totalVotes = ideas.reduce(
    (acc, idea) => acc + (idea.countVotes || idea.votes?.length || 0),
    0
  )

  return {
    totalIdeas,
    totalComments,
    totalVotes,
  }
}

export function sortIdeas(ideas: Idea[], sortBy: SortOption, currentUserId?: string): Idea[] {
  let result = [...ideas]

  if (sortBy === "mine" && currentUserId) {
    result = result.filter(
      (idea) => idea.authorId === currentUserId || idea.author?.id === currentUserId
    )
  }

  return result.sort((a, b) => {
    if (sortBy === "recent" || sortBy === "mine") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
    if (sortBy === "votes") {
      const votesA = a.countVotes || a.votes?.length || 0
      const votesB = b.countVotes || b.votes?.length || 0
      return votesB - votesA
    }
    if (sortBy === "comments") {
      const commentsA = a.comments?.length || 0
      const commentsB = b.comments?.length || 0
      return commentsB - commentsA
    }
    return 0
  })
}