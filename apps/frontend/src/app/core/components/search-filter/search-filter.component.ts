import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchMenuDropdownComponent } from "../search-menu-dropdown/search-menu-dropdown.component";
import { SkillService } from "../../services/skill.service";
import { SocietyService } from "../../services/society.service";
import { SkillType, SocietyType } from "@carbon/zod";
import { SearchMenuService } from "../../../shared/services/search-menu.service";

@Component({
  selector: "carbon-search-filter",
  standalone: true,
  imports: [CommonModule, SearchMenuDropdownComponent],
  templateUrl: "./search-filter.component.html",
})
export class SearchFilterComponent implements OnInit {
  skills: SkillType[] = [];
  societies: SocietyType[] = [];

  constructor(
    private skillService: SkillService,
    private societyService: SocietyService,
    public searchMenuService: SearchMenuService
  ) {}

  ngOnInit() {
    this.skillService.getSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
      },
      error: console.error,
    });

    this.societyService.getSocieties().subscribe({
      next: (societies) => {
        this.societies = societies;
      },
      error: console.error,
    });
  }
}
