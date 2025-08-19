export type createProblemDto = {
        title: string;
        difficulty: "Easy" | "Medium" | "Hard";
        topics: string[];
        companies?: string[];
        hints?: string[];
        statement: string;
        notice?: string;
        examples: string[];
        constraints: string[];
}

export type updateProblemDto = {
        title?: string;
        difficulty?: "Easy" | "Medium" | "Hard";
        topics?: string[];
        companies?: string[];
        hints?: string[];
        statement?: string;
        notice?: string;
        examples?: string[];
        constraints?: string[];
}