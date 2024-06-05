export interface PeriodicDailySteps {
    studentId: string | null;
    dailySteps: DailySteps[];
    startDate: Date | null;
    endDate: Date | null;
}

export interface DailySteps {
    id: string | null;
    studentId: string | null;
    steps: number | null;
    date: Date | null;
}