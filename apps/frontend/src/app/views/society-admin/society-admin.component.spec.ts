import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SocietyAdminComponent } from "./society-admin.component";

describe("SocietyAdminComponent", () => {
  let component: SocietyAdminComponent;
  let fixture: ComponentFixture<SocietyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocietyAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SocietyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
