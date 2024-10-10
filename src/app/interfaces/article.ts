import { Data } from "@angular/router";

export interface Article {
    id: number;
    title: string;
    abstract: string;
    subtitle: string;
    update_date: Date;
    category: string;
    image_media_type: string;
    image_data: string;
}