import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HomePageService } from '../home-page/home-page.service';

@Component({
  selector: 'app-add-image-pop-up',
  templateUrl: './add-image-pop-up.component.html',
  styleUrls: ['./add-image-pop-up.component.scss']
})
export class AddImagePopUpComponent implements OnInit {

  imageUploaderForm:FormGroup;
  error:string = '';
  urlRegex =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  constructor(
    public homePageService: HomePageService,
    private matDialogRef: MatDialogRef<AddImagePopUpComponent>,
    private formBuilder: FormBuilder
    ) {
      this.imageUploaderForm = this.formBuilder.group({
        label: '',
        imageUrl: ''
      });
    }
  
  ngOnInit(): void {
  }

  
  uploadImage() {
    const formdata = {
      label: this.imageUploaderForm.get('label')?.value,
      image_url: this.imageUploaderForm.get('imageUrl')?.value
    }
    if (formdata.label && formdata.image_url) {
      if(this.urlRegex.test(formdata.image_url)){
        if(formdata.image_url.length<=200){
          this.homePageService.uploadImage(formdata).subscribe(
            (response:any) => this.homePageService.showSuccess('Updated Successfully!')
          )
          this.closePopup();
        }
        else this.error = "URL should be less than 200 characters"
      }
      else {
        this.error = "Invalid URL"
      }
    }
    else{
      this.error = "Fields can't be empty"
    }
  }

  closePopup(){
    this.matDialogRef.close()
  }
}
