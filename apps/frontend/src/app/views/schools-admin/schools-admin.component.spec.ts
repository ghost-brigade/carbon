import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SchoolsAdminComponent } from "./schools-admin.component";

describe("SchoolsAdminComponent", () => {
  let component: SchoolsAdminComponent;
  let fixture: ComponentFixture<SchoolsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
