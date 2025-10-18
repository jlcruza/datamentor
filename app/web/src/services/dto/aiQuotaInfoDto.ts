export type AIQuotaInfoDto = {
    usedTokens: number;
    totalTokens: number;
    percentageUsed: number;
    isUnderLimit: boolean;
    billingPeriod: string;
};