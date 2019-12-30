import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  styleUrls: ['./pager.component.scss'],

  template: `
  <nav aria-label="Page navigation example">
  <ul *ngIf="pager.pages && pager.pages.length" class="pagination justify-content-end">
      
      <li class="page-item" [ngClass]="{disabled:pager.currentPage == 1}">
          <a  class="page-link preIcon" (click)="setPage(pager.currentPage - 1)">
              
          </a>
      </li>
      <li class="page-item" *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage == page}">
          <a  class="page-link" (click)="setPage(page)">{{page}}</a>
      </li>
      <li class="page-item" [ngClass]="{disabled:pager.currentPage == pager.totalPages}">
          <a  class="page-link nextIcon" (click)="setPage(pager.currentPage + 1)">
          </a>
      </li>
     
      <li class="page-item">
          <span>到  </span>
                                          
      </li>
      <li class="page-item">
          <input type="text"  class="" id="pageNumber" name="pageNumber" #pageNumber value="{{pager.currentPage}}">
      </li>
      <li class="page-item">
           <span> 页 </span>   
      </li>
      <li class="page-item">
          <button type="button" class="pageSearch" (click)="setPage(pageNumber.value)">确认</button>
      </li> 

  </ul>

</nav> 
  `
})
export class PagerComponent implements OnInit {
 
  @Input() totalItems: any;
  @Input() currentPage: any;
  @Output() pageChange = new EventEmitter<number>();
  public pager:any;
  constructor() { 
   
  }

  ngOnInit() {
    console.log("ngOnInit")
    this.pager=this.getPager(this.totalItems,this.currentPage)
  }
  ngOnChanges(){
    console.log("ngOnChanges")
    this.pager=this.getPager(this.totalItems,this.currentPage)
  }
  
  private getPager(totalItems: number, currentPage: number=1, pageSize: number = 10) {
    // calculate total pages
    currentPage=Number(currentPage)
    let totalPages = Math.ceil(totalItems / pageSize);
  
    // ensure current page isn't out of range
    if (currentPage < 1) { 
        currentPage = 1; 
    } else if (currentPage > totalPages) { 
        currentPage = totalPages; 
    }
    
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }
  
    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  
    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
  
    // return object with all pager properties required by the view
   
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
    }
  setPage(page){
    this.currentPage=page
    this.pageChange.emit(page);
  }
}

