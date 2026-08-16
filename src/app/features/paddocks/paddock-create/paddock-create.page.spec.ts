import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaddockCreatePage } from './paddock-create.page';

describe('PaddockCreateComponent', () => {
  let component: PaddockCreatePage;
  let fixture: ComponentFixture<PaddockCreatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaddockCreatePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PaddockCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
