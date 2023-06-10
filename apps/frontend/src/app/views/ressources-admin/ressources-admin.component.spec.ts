import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RessourcesAdminComponent } from "./ressources-admin.component";

describe("RessourcesAdminComponent", () => {
  let component: RessourcesAdminComponent;
  let fixture: ComponentFixture<RessourcesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessourcesAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RessourcesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
