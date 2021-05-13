import { MeiliSearchClient } from "../deps.ts"

class Search extends MeiliSearchClient {
  close?: () => void
}

export type { Search }
