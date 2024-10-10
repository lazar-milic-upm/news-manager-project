export interface Article {
    id: number;
    title: string;
    abstract: string;
    subtitle: string;
    body: string;
    update_date: Date;
    modifiedDate: Date;
    imageUrl?: string;
    category: string;
    modifiedBy: string;
}