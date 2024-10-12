export interface Article {
    id: number;
    title: string;
    subtitle: string;
    abstract: string;
    body: string;
    update_date: Date;
    modifiedDate: Date;
    imageUrl?: string;           
    category: string;
    image_data?: string;         
    image_media_type?: string;
    username: string;
}
