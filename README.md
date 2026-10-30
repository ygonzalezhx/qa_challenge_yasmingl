# MedAppoint: UI Test Automation

End-to-end UI automation for the MedAppoint appointment management app, built with Playwright, TypeScript and the Page Object Model (POM).

## Flows covered

| # | Flow | Steps | Key assertions |
|---|------|-------|----------------|
| 1 | **Book an appointment** (main flow) | Login → Appointments → Book new appointment → Verify → Logout | Success message; appointment listed with the selected doctor, date and time and with the expected status; session ends after logout |
| 2 | **Reschedule an appointment** | Login → Appointments → Select a valid appointment → Reschedule → Verify | Same appointment shows the new date/time; status is correct; change persists after page reload |
| 3 | **Cancel an appointment** | Login → Appointments → Select a valid appointment → Cancel → Verify | Success message; status is *Canceled*; change persists after page reload |

**Modules touched:** Dashboard (post-login landing), Appointments (main target), Doctors (doctor and slot selection while booking), Notifications (not asserted; see *Out of scope*).

**Out of scope:** negative and boundary scenarios, API testing (covered in the Postman collection), cross-browser and non-functional testing, notification content.

## Tech stack

- **Playwright Test** (`@playwright/test`): runner, assertions, auto-waiting, traces
- **TypeScript**
- **dotenv**: environment configuration
- **Node.js** 18 or higher

## Project structure

```
automation/
├── tests/
│   ├── book-appointment.spec.ts
│   ├── reschedule-appointment.spec.ts
│   └── cancel-appointment.spec.ts
├── pages/                      # Page Objects: locators and actions only
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── AppointmentsPage.ts
│
├── fixtures/
│   └── test-fixtures.ts        # custom fixtures: page objects, logged-in session
├── utils/
│   ├── date-helper.ts          # dynamic future dates and slots
│   └── env.ts                  # typed, validated environment variables
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

**Design decisions**
- **POM**: pages expose actions (`bookAppointment()`, `reschedule()`, `cancel()`); assertions live in the tests.
- **Fixtures**: page objects and the authenticated session are injected through Playwright fixtures; tests do not instantiate pages manually.
- **Independent tests**: each test creates (or selects) its own appointment as a precondition, with dynamically calculated dates; no test depends on another one's data or execution order.
- **Locators**: role-, label- or `data-testid`-based; no brittle CSS/XPath unless last resort.
- **No hardcoded data**: URL and credentials come from environment variables; dates and slots are generated at runtime.
- **Single account**: tests run serially (`workers: 1`) because they share one patient account and logout invalidates the session.

## Prerequisites

- Node.js 18+ and npm
- Access to the MedAppoint QA environment and a patient test account

## Prerequisites
- Ensure Node.js is installed on your local machine.
- Use Visual Studio Code for the best development experience.

## Installation
 - Clone the repository.
 - Install dependencies:
     npm install 
 - Initialize the Playwright configuration:
    npx playwright install
 - (Optional) Generate the TypeScript configuration if not present:
    npx tsc --init

## Configuration

```bash
cp .env.example .env
```

Edit `.env`:

```
BASE_URL=[application url]
USER_EMAIL=[patient username]
USER_PASSWORD=[patient password]
```

`.env` is git-ignored. Never commit credentials.

## Running the tests

```bash
npm test                 # run all flows (headless)
npm run test:headed      # run with a visible browser
npm run test:ui          # Playwright UI mode (debugging)
npx playwright test tests/reschedule-appointment.spec.ts   # a single flow
npm run report           # open the HTML report of the last run
```

Scripts in `package.json`:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "report": "playwright show-report"
  }
}
```

Once the environment variables are set, no manual intervention is needed.

## Reports and artifacts

- HTML report: `playwright-report/`
- On failure: screenshot, video and trace are kept in `test-results/`
- Open a trace with `npx playwright show-trace [trace.zip]`

## Known application defects

Some tests assert the **expected** behavior and fail while the underlying defect is open. They are tagged `@known-bug` and linked to the report from the functional testing phase:

| Test | Related defect |
|------|----------------|
| Cancel: status persists after reload | [BUG-05] Cancellation not persisted |
| Reschedule: new date/time displayed correctly | [BUG-01] Wrong date/time shown after rescheduling |
| Appointments: new date is displayed correctly | [BUG-06] Wrong date shown in existing appointments |

Run them separately with `npx playwright test --grep @known-bug`, or exclude them with `--grep-invert @known-bug`.

## Possible next steps

- Negative and boundary scenarios for booking and rescheduling
- Direct API setup/teardown of test data to speed up preconditions
- Cross-browser projects and CI pipeline integration