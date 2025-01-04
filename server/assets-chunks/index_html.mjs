export default `<!DOCTYPE html><html lang="en" data-beasties-container><head><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <meta charset="utf-8">
  <title>QuizGame</title>
  <base href="/betting-trivia/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <style>@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmSU5fCRc4EsA.woff2) format('woff2');unicode-range:U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmSU5fABc4EsA.woff2) format('woff2');unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmSU5fCBc4EsA.woff2) format('woff2');unicode-range:U+1F00-1FFF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmSU5fBxc4EsA.woff2) format('woff2');unicode-range:U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmSU5fCxc4EsA.woff2) format('woff2');unicode-range:U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmSU5fChc4EsA.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmSU5fBBc4.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Mu72xKOzY.woff2) format('woff2');unicode-range:U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Mu5mxKOzY.woff2) format('woff2');unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Mu7mxKOzY.woff2) format('woff2');unicode-range:U+1F00-1FFF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Mu4WxKOzY.woff2) format('woff2');unicode-range:U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Mu7WxKOzY.woff2) format('woff2');unicode-range:U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Mu7GxKOzY.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmEU9fCRc4EsA.woff2) format('woff2');unicode-range:U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmEU9fABc4EsA.woff2) format('woff2');unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmEU9fCBc4EsA.woff2) format('woff2');unicode-range:U+1F00-1FFF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmEU9fBxc4EsA.woff2) format('woff2');unicode-range:U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmEU9fCxc4EsA.woff2) format('woff2');unicode-range:U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmEU9fChc4EsA.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmEU9fBBc4.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}</style>
  <style>@font-face{font-family:'Material Icons';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/materialicons/v142/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');}.material-icons{font-family:'Material Icons';font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:'liga';-webkit-font-smoothing:antialiased;}</style>
<style>html{--mat-sys-background: #faf9fd;--mat-sys-error: #ba1a1a;--mat-sys-error-container: #ffdad6;--mat-sys-inverse-on-surface: #f2f0f4;--mat-sys-inverse-primary: #abc7ff;--mat-sys-inverse-surface: #2f3033;--mat-sys-on-background: #1a1b1f;--mat-sys-on-error: #ffffff;--mat-sys-on-error-container: #410002;--mat-sys-on-primary: #ffffff;--mat-sys-on-primary-container: #001b3f;--mat-sys-on-primary-fixed: #001b3f;--mat-sys-on-primary-fixed-variant: #00458f;--mat-sys-on-secondary: #ffffff;--mat-sys-on-secondary-container: #131c2b;--mat-sys-on-secondary-fixed: #131c2b;--mat-sys-on-secondary-fixed-variant: #3e4759;--mat-sys-on-surface: #1a1b1f;--mat-sys-on-surface-variant: #44474e;--mat-sys-on-tertiary: #ffffff;--mat-sys-on-tertiary-container: #00006e;--mat-sys-on-tertiary-fixed: #00006e;--mat-sys-on-tertiary-fixed-variant: #0000ef;--mat-sys-outline: #74777f;--mat-sys-outline-variant: #c4c6d0;--mat-sys-primary: #005cbb;--mat-sys-primary-container: #d7e3ff;--mat-sys-primary-fixed: #d7e3ff;--mat-sys-primary-fixed-dim: #abc7ff;--mat-sys-scrim: #000000;--mat-sys-secondary: #565e71;--mat-sys-secondary-container: #dae2f9;--mat-sys-secondary-fixed: #dae2f9;--mat-sys-secondary-fixed-dim: #bec6dc;--mat-sys-shadow: #000000;--mat-sys-surface: #faf9fd;--mat-sys-surface-bright: #faf9fd;--mat-sys-surface-container: #efedf0;--mat-sys-surface-container-high: #e9e7eb;--mat-sys-surface-container-highest: #e3e2e6;--mat-sys-surface-container-low: #f4f3f6;--mat-sys-surface-container-lowest: #ffffff;--mat-sys-surface-dim: #dbd9dd;--mat-sys-surface-tint: #005cbb;--mat-sys-surface-variant: #e0e2ec;--mat-sys-tertiary: #343dff;--mat-sys-tertiary-container: #e0e0ff;--mat-sys-tertiary-fixed: #e0e0ff;--mat-sys-tertiary-fixed-dim: #bec2ff;--mat-sys-neutral-variant20: #2d3038;--mat-sys-neutral10: #1a1b1f}html{--mat-sys-level0: 0px 0px 0px 0px rgba(0, 0, 0, .2), 0px 0px 0px 0px rgba(0, 0, 0, .14), 0px 0px 0px 0px rgba(0, 0, 0, .12)}html{--mat-sys-level1: 0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12)}html{--mat-sys-level2: 0px 3px 3px -2px rgba(0, 0, 0, .2), 0px 3px 4px 0px rgba(0, 0, 0, .14), 0px 1px 8px 0px rgba(0, 0, 0, .12)}html{--mat-sys-level3: 0px 3px 5px -1px rgba(0, 0, 0, .2), 0px 6px 10px 0px rgba(0, 0, 0, .14), 0px 1px 18px 0px rgba(0, 0, 0, .12)}html{--mat-sys-level4: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12)}html{--mat-sys-level5: 0px 7px 8px -4px rgba(0, 0, 0, .2), 0px 12px 17px 2px rgba(0, 0, 0, .14), 0px 5px 22px 4px rgba(0, 0, 0, .12)}html{--mat-sys-body-large: 400 1rem / 1.5rem Roboto;--mat-sys-body-large-font: Roboto;--mat-sys-body-large-line-height: 1.5rem;--mat-sys-body-large-size: 1rem;--mat-sys-body-large-tracking: .031rem;--mat-sys-body-large-weight: 400;--mat-sys-body-medium: 400 .875rem / 1.25rem Roboto;--mat-sys-body-medium-font: Roboto;--mat-sys-body-medium-line-height: 1.25rem;--mat-sys-body-medium-size: .875rem;--mat-sys-body-medium-tracking: .016rem;--mat-sys-body-medium-weight: 400;--mat-sys-body-small: 400 .75rem / 1rem Roboto;--mat-sys-body-small-font: Roboto;--mat-sys-body-small-line-height: 1rem;--mat-sys-body-small-size: .75rem;--mat-sys-body-small-tracking: .025rem;--mat-sys-body-small-weight: 400;--mat-sys-display-large: 400 3.562rem / 4rem Roboto;--mat-sys-display-large-font: Roboto;--mat-sys-display-large-line-height: 4rem;--mat-sys-display-large-size: 3.562rem;--mat-sys-display-large-tracking: -.016rem;--mat-sys-display-large-weight: 400;--mat-sys-display-medium: 400 2.812rem / 3.25rem Roboto;--mat-sys-display-medium-font: Roboto;--mat-sys-display-medium-line-height: 3.25rem;--mat-sys-display-medium-size: 2.812rem;--mat-sys-display-medium-tracking: 0;--mat-sys-display-medium-weight: 400;--mat-sys-display-small: 400 2.25rem / 2.75rem Roboto;--mat-sys-display-small-font: Roboto;--mat-sys-display-small-line-height: 2.75rem;--mat-sys-display-small-size: 2.25rem;--mat-sys-display-small-tracking: 0;--mat-sys-display-small-weight: 400;--mat-sys-headline-large: 400 2rem / 2.5rem Roboto;--mat-sys-headline-large-font: Roboto;--mat-sys-headline-large-line-height: 2.5rem;--mat-sys-headline-large-size: 2rem;--mat-sys-headline-large-tracking: 0;--mat-sys-headline-large-weight: 400;--mat-sys-headline-medium: 400 1.75rem / 2.25rem Roboto;--mat-sys-headline-medium-font: Roboto;--mat-sys-headline-medium-line-height: 2.25rem;--mat-sys-headline-medium-size: 1.75rem;--mat-sys-headline-medium-tracking: 0;--mat-sys-headline-medium-weight: 400;--mat-sys-headline-small: 400 1.5rem / 2rem Roboto;--mat-sys-headline-small-font: Roboto;--mat-sys-headline-small-line-height: 2rem;--mat-sys-headline-small-size: 1.5rem;--mat-sys-headline-small-tracking: 0;--mat-sys-headline-small-weight: 400;--mat-sys-label-large: 500 .875rem / 1.25rem Roboto;--mat-sys-label-large-font: Roboto;--mat-sys-label-large-line-height: 1.25rem;--mat-sys-label-large-size: .875rem;--mat-sys-label-large-tracking: .006rem;--mat-sys-label-large-weight: 500;--mat-sys-label-large-weight-prominent: 700;--mat-sys-label-medium: 500 .75rem / 1rem Roboto;--mat-sys-label-medium-font: Roboto;--mat-sys-label-medium-line-height: 1rem;--mat-sys-label-medium-size: .75rem;--mat-sys-label-medium-tracking: .031rem;--mat-sys-label-medium-weight: 500;--mat-sys-label-medium-weight-prominent: 700;--mat-sys-label-small: 500 .688rem / 1rem Roboto;--mat-sys-label-small-font: Roboto;--mat-sys-label-small-line-height: 1rem;--mat-sys-label-small-size: .688rem;--mat-sys-label-small-tracking: .031rem;--mat-sys-label-small-weight: 500;--mat-sys-title-large: 400 1.375rem / 1.75rem Roboto;--mat-sys-title-large-font: Roboto;--mat-sys-title-large-line-height: 1.75rem;--mat-sys-title-large-size: 1.375rem;--mat-sys-title-large-tracking: 0;--mat-sys-title-large-weight: 400;--mat-sys-title-medium: 500 1rem / 1.5rem Roboto;--mat-sys-title-medium-font: Roboto;--mat-sys-title-medium-line-height: 1.5rem;--mat-sys-title-medium-size: 1rem;--mat-sys-title-medium-tracking: .009rem;--mat-sys-title-medium-weight: 500;--mat-sys-title-small: 500 .875rem / 1.25rem Roboto;--mat-sys-title-small-font: Roboto;--mat-sys-title-small-line-height: 1.25rem;--mat-sys-title-small-size: .875rem;--mat-sys-title-small-tracking: .006rem;--mat-sys-title-small-weight: 500}html{--mat-sys-corner-extra-large: 28px;--mat-sys-corner-extra-large-top: 28px 28px 0 0;--mat-sys-corner-extra-small: 4px;--mat-sys-corner-extra-small-top: 4px 4px 0 0;--mat-sys-corner-full: 9999px;--mat-sys-corner-large: 16px;--mat-sys-corner-large-end: 0 16px 16px 0;--mat-sys-corner-large-start: 16px 0 0 16px;--mat-sys-corner-large-top: 16px 16px 0 0;--mat-sys-corner-medium: 12px;--mat-sys-corner-none: 0;--mat-sys-corner-small: 8px}html{--mat-sys-dragged-state-layer-opacity: .16;--mat-sys-focus-state-layer-opacity: .12;--mat-sys-hover-state-layer-opacity: .08;--mat-sys-pressed-state-layer-opacity: .12}html,body{margin:0;padding:0;width:100%;height:100%;font-family:Helvetica Neue,Arial,sans-serif;background:linear-gradient(135deg,#2e2e3e,#4e4e7e);color:#e0e0e0;overflow:hidden}.app-container{display:flex;flex-direction:row;width:100vw;height:100vh;justify-content:center;align-items:center}.room{flex:2;max-width:800px;height:90%;margin-right:20px;display:flex;flex-direction:column;background:#0000004d;border-radius:8px;padding:20px;overflow-y:auto}.game-container{display:flex;flex-direction:column;align-items:center;flex:1;overflow-y:auto}.question-image{max-width:100%;border-radius:4px;margin-bottom:10px;border:2px solid #6e5e9f}.sidebar{flex:1;height:90%;background:#0000004d;border-radius:8px;padding:20px;overflow-y:auto;display:flex;flex-direction:column}.player-list{display:flex;flex-direction:column;gap:10px}
</style><link rel="stylesheet" href="styles-FOSFKDYQ.css" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="styles-FOSFKDYQ.css"></noscript><style ng-app-id="ng">[_ngcontent-ng-c1045948096]:root{--bg-main: #2b2a3d;--bg-sidebar: #3e3d57;--bg-accent: #6c63ff;--bg-answer: #4a4966;--text-color: #f0f0f0;--bg-selected: #6c63ff;--bg-bet-default: #534f6e;--bg-image-container: #413f5a}.app-container[_ngcontent-ng-c1045948096]{display:flex;flex-direction:row;height:100vh;background:var(--bg-main);color:var(--text-color);font-family:sans-serif;overflow:hidden;box-sizing:border-box;gap:10px}</style><style ng-app-id="ng">.play-again[_ngcontent-ng-c217827174]{position:relative;top:25px;left:50%;transform:translate(-50%);padding:15px 30px;background:#4e4e7e;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:1rem;transition:background .3s ease;z-index:1000;box-shadow:0 4px 6px #0000001a}.play-again[_ngcontent-ng-c217827174]:hover{background:#5e5e8e}.room[_ngcontent-ng-c217827174]{flex:1;display:flex;flex-direction:column;padding:20px;box-sizing:border-box;position:relative;height:620px;width:500px}.question-caption[_ngcontent-ng-c217827174]{margin-top:20px;text-align:center;justify-content:center;align-items:center;font-size:1.2rem}.betting[_ngcontent-ng-c217827174]{position:absolute;top:20px;left:20px;display:flex;gap:10px}.betting[_ngcontent-ng-c217827174]   button[_ngcontent-ng-c217827174]{background:#a78bfa;border:none;padding:8px 12px;border-radius:4px;color:var(--text-color);cursor:pointer;font-size:.9rem;transition:background .3s}.betting[_ngcontent-ng-c217827174]   button.selected[_ngcontent-ng-c217827174]{background:#7c3aed}.answers[_ngcontent-ng-c217827174]{display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(2,auto);gap:15px;margin-top:20px}.answer[_ngcontent-ng-c217827174]{background:#c4b5fd;padding:15px;border-radius:4px;text-align:center;cursor:pointer;transition:background .3s}.answer[_ngcontent-ng-c217827174]{background:#5d3fd3!important;padding:10px 20px;border-radius:4px;cursor:pointer;transition:.3s ease;text-align:center}.answer[_ngcontent-ng-c217827174]:hover{background:#1f1f2e!important}.answer.selected[_ngcontent-ng-c217827174]{background:#4e4e7e!important;color:#f0f0f0}.start-button[_ngcontent-ng-c217827174]{position:relative;top:50px;background:#4e4e7e;border:none;padding:20px;cursor:pointer;font-weight:700;color:#f0f0f0;border-radius:4px;transition:.3s ease}.start-button[_ngcontent-ng-c217827174]:hover{background:#5e5e8e}.img-container[_ngcontent-ng-c217827174]{width:400px;height:300px}.question-image[_ngcontent-ng-c217827174]{max-width:100%;border-radius:8px;width:100%;height:100%;object-fit:fill;object-position:center}</style><style ng-app-id="ng">.leaderboard-header[_ngcontent-ng-c4254105257]{background:linear-gradient(135deg,#6b73ff,#000dff);color:#fff;font-size:1.5rem;text-align:center;padding:10px;border-radius:8px;font-weight:700;margin-bottom:15px;box-shadow:0 4px 6px #0000004d}.sidebar[_ngcontent-ng-c4254105257]{width:300px;height:600px;background:#0000004d;border-radius:8px;padding:10px;overflow-y:auto;display:flex;flex-direction:column}.player-list[_ngcontent-ng-c4254105257]{display:flex;flex-direction:column;gap:10px;width:100%}.player-box.eliminated[_ngcontent-ng-c4254105257]{opacity:.5;text-decoration:line-through}.skull-emoji[_ngcontent-ng-c4254105257]{margin-left:5px;color:red}.player-box[_ngcontent-ng-c4254105257]{width:100%;height:80px;background:#3e3e5e;border-radius:8px;padding:5px;box-sizing:border-box;display:flex;align-items:center;transition:.3s ease}.player-box.correct[_ngcontent-ng-c4254105257]{box-shadow:0 0 0 3px #90be6d66}.player-box.incorrect[_ngcontent-ng-c4254105257]{box-shadow:0 0 0 3px #f9414466}.player-info[_ngcontent-ng-c4254105257]{width:100%;height:100%;display:flex;flex-direction:row;align-items:center}.player-left[_ngcontent-ng-c4254105257]{display:flex;flex-direction:column;align-items:center;justify-content:center;width:80px;gap:2px;flex-shrink:0}.player-profile-pic[_ngcontent-ng-c4254105257]{width:30px;height:30px;border-radius:50%;object-fit:cover}.player-username[_ngcontent-ng-c4254105257]{font-size:.8em;color:#cfcfff;text-align:center;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.player-right[_ngcontent-ng-c4254105257]{display:flex;flex-direction:row;align-items:stretch;flex:1;gap:2px;height:100%}.player-score-box[_ngcontent-ng-c4254105257]{background:#2e2e4e;color:#f0f0f0;font-size:1em;display:flex;align-items:center;justify-content:center;border-radius:4px;flex:.5;height:50%;box-sizing:border-box;border:1px solid #1f1f2e}.player-bet-box[_ngcontent-ng-c4254105257]{background:#2e2e4e;color:#f0f0f0;font-size:1em;display:flex;align-items:center;justify-content:center;border-radius:4px;flex:1.5;height:50%;box-sizing:border-box;border:1px solid #1f1f2e}.score-percentage-container[_ngcontent-ng-c4254105257]{display:flex;flex-direction:column;align-items:stretch;flex:.5;height:90%;gap:2px}.player-answer-box[_ngcontent-ng-c4254105257]{background:#2e2e4e;color:#f0f0f0;font-size:1em;display:flex;align-items:center;justify-content:center;border-radius:4px;flex:1.5;height:90%;box-sizing:border-box;border:1px solid #1f1f2e}.player-score-box[_ngcontent-ng-c4254105257]   span[_ngcontent-ng-c4254105257]{width:100%;text-align:center;padding-right:5px}.player-bet-box[_ngcontent-ng-c4254105257]   span[_ngcontent-ng-c4254105257], .player-answer-box[_ngcontent-ng-c4254105257]   span[_ngcontent-ng-c4254105257]{width:100%;text-align:center}.system-message[_ngcontent-ng-c4254105257]{background:#323246cc;color:#fff;font-size:1rem;text-align:center;padding:10px;border-radius:8px;margin-top:auto;box-shadow:0 -4px 6px #0000004d;font-style:italic}.player-list-container[_ngcontent-ng-c4254105257]{flex:1;overflow-y:auto;margin-bottom:10px}[_ngcontent-ng-c4254105257]::-webkit-scrollbar{width:8px}[_ngcontent-ng-c4254105257]::-webkit-scrollbar-thumb{background:#fff3;border-radius:4px}[_ngcontent-ng-c4254105257]::-webkit-scrollbar-track{background:transparent}</style></head>
<body class="mat-typography">
  <app-root _nghost-ng-c1045948096 ng-version="19.0.3" ng-server-context="ssg"><div _ngcontent-ng-c1045948096 class="app-container"><app-room _ngcontent-ng-c1045948096 _nghost-ng-c217827174><!----><!----><div _ngcontent-ng-c217827174 class="room"><div _ngcontent-ng-c217827174 class="game-container"><div _ngcontent-ng-c217827174 class="img-container"><img _ngcontent-ng-c217827174 src="https://via.placeholder.com/400?text=Waiting+for+Players" alt="Placeholder Image" class="question-image"></div><p _ngcontent-ng-c217827174 class="question-caption">Waiting for players...</p></div><!----><!----><!----><!----></div><!----></app-room><app-sidebar _ngcontent-ng-c1045948096 _nghost-ng-c4254105257><div _ngcontent-ng-c4254105257 class="sidebar"><div _ngcontent-ng-c4254105257 class="leaderboard-header"> Leaderboard </div><div _ngcontent-ng-c4254105257 class="player-list-container"><div _ngcontent-ng-c4254105257 class="player-list"><!----></div></div><!----></div></app-sidebar></div></app-root>
<link rel="modulepreload" href="chunk-56GH3RF6.js"><script src="polyfills-FFHMD2TL.js" type="module"></script><script src="main-LOVJXLG7.js" type="module"></script>

</body></html>`;