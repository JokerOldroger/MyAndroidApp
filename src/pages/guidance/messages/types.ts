export type CompetitionEvent = {
  id: string;
  title: string;
  city: '深圳' | '上海' | '北京';
  statusLabel: string;
  summary: string;
  detail: string;
  publishAt: string;
  remindAt: string;
};

export type PublicNewsItem = {
  id: string;
  title: string;
  source: string;
  region: CompetitionRegion;
  summary: string;
  url: string;
};

export type NotificationSupport = {
  available: boolean;
  reason?: string;
};

export type CompetitionRegion = '深圳' | '上海' | '北京' | '全部';
