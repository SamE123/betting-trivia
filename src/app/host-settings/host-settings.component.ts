import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgFor} from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './host-settings.component.html',
  imports: [NgClass, NgFor, FormsModule],
  styleUrls: ['./host-settings.component.css'],
})

export class SettingsComponent implements OnInit {
  @Input() phaseThreshold: number = 50; // Default value
  @Input() categories: string[] = [];
  @Input() subcategories: string[] = [];
  @Input() isHost: boolean = false;
  @Input() isUpdatingSettings: boolean = false; // New flag to disable the button


  @Output() applySettings = new EventEmitter<any>();

  selectedCategories: { [key: string]: boolean } = {};
  selectedSubcategories: { [key: string]: boolean } = {};

  showSettings: boolean = false; // Controls visibility of the settings
  isApplied: boolean = false; // Tracks if the settings are applied


  ngOnInit() {
    // Initialize categories and subcategories
    this.categories.forEach((category) => (this.selectedCategories[category] = false));
    this.subcategories.forEach((subcategory) => (this.selectedSubcategories[subcategory] = false));
  }

  toggleSettings() {
    this.showSettings = !this.showSettings; // Toggle the visibility
  }

  apply() {
    if (this.isUpdatingSettings) {
      console.log("dupe submission found")
      return; // Prevent duplicate submissions
    }
    this.isUpdatingSettings = true;

    console.log("is updating settings")


    const selectedCategories = Object.keys(this.selectedCategories).filter(
      (key) => this.selectedCategories[key]
    );
    const selectedSubcategories = Object.keys(this.selectedSubcategories).filter(
      (key) => this.selectedSubcategories[key]
    );

    this.applySettings.emit({
      phaseThreshold: this.phaseThreshold,
      selectedCategories,
      selectedSubcategories,
    });

    this.isApplied = true; // Mark settings as applied

    // Reset `isApplied` after a delay if desired
    setTimeout(() => {
      this.isApplied = false;
    }, 3000); // Optional: Reset after 3 seconds
  }
}
  