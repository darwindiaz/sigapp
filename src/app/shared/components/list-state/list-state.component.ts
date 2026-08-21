import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ListStateType = 'loading' | 'empty' | 'error' | 'info';

@Component({
  selector: 'app-list-state',
  templateUrl: './list-state.component.html',
  styleUrls: ['./list-state.component.scss'],
})
export class ListStateComponent {
  @Input() state: ListStateType = 'empty';
  @Input() icon?: string;
  @Input() title = '';
  @Input() description = '';
  @Input() actionLabel?: string;

  @Output() action = new EventEmitter<void>();

  get isLoading(): boolean {
    return this.state === 'loading';
  }

  get resolvedIcon(): string {
    if (this.icon) {
      return this.icon;
    }

    const icons: Record<Exclude<ListStateType, 'loading'>, string> = {
      empty: 'file-tray-outline',
      error: 'cloud-offline-outline',
      info: 'information-circle-outline',
    };

    return icons[this.state as Exclude<ListStateType, 'loading'>];
  }

  emitAction(): void {
    this.action.emit();
  }
}
