import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";


@Injectable({ providedIn: 'root' })
export class HomePageService {
    constructor(
        private http: HttpClient,
        private toastr: ToastrService
        ) { }

    showSuccess(message: string){
        this.toastr.success(message)
    }
    showError(message?: string) {
        this.toastr.error("Something went wrong, try again!")
    }
    getImages(label?:string) {
        if(label){
            return this.http.get(`http://127.0.0.1:8000/image?label=${label}`);
        }
        else {
            return this.http.get(`http://127.0.0.1:8000/image`);
        }
    }

    uploadImage(data: Object) {
        return this.http.post('http://127.0.0.1:8000/image', data)
    }

    deleteImage(imageId: number) {
        return this.http.delete(`http://127.0.0.1:8000/image?id=${imageId}`)
    }
}