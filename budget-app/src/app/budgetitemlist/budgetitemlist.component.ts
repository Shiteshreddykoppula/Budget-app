import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import {MatDialog} from '@angular/material/dialog/'
import { EditItemModelComponent } from '../edit-item-model/edit-item-model.component';
export interface UpdateEvent{
  old: BudgetItem;
  new: BudgetItem;
  }

@Component({
  selector: 'app-budgetitemlist',
  templateUrl: './budgetitemlist.component.html',
  styleUrls: ['./budgetitemlist.component.scss']
})


export class BudgetitemlistComponent implements OnInit {

  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onDeleteButtonClicked(item: BudgetItem){
    this.delete.emit(item);
  }
  onCardClicked(item: BudgetItem){
    const dialogRef = this.dialog.open(EditItemModelComponent,{
      width: '580px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        //replace the item with the updated/submitted item from the form
        this.update.emit({
          old: item, new: result
        });
      //   this.budgetItems[this.budgetItems.indexOf(item)]=result;  
       }
    }
      )
  }

}
