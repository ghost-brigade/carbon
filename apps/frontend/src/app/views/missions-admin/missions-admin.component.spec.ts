import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MissionsAdminComponent } from "./missions-admin.component";

describe("MissionsAdminComponent", () => {
  let component: MissionsAdminComponent;
  let fixture: ComponentFixture<MissionsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MissionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
