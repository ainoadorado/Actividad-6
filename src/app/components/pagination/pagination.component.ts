import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Output() pageEmitter: EventEmitter<number> = new EventEmitter();

  page: number = 1;
  First: number = 0;
  Last: number = 0;
  totalPages: any[] = [];

  constructor(private usersService: UsersService) { }

  async ngOnInit() {
    let response = await this.usersService.getAll(this.page)
    this.totalPages = new Array(response['total_pages'])
    this.First = 1;
    this.Last = response.total_pages;
  }


  previous(): void {
    if (this.page > this.First) {
      this.page--;
      this.turnPage();
    }

  }

  next(): void {
    if (this.page < this.Last) {
      this.page++;
      this.turnPage();
    }
  }

  setPage(pPage: number): void {
    this.page = pPage;
    this.turnPage();
  }

  turnPage() {
    this.pageEmitter.emit(this.page)
  }

}
