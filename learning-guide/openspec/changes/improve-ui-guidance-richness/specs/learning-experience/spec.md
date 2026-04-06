## MODIFIED Requirements

### Requirement: Home page presents a single primary entry path

The home page MUST present a tutorial-first entry that makes the primary starting path clearer than secondary exploration paths.

#### Scenario: First-time visitor lands on the home page

- **WHEN** a visitor opens `/`
- **THEN** the page highlights one primary start action
- **AND** the page explains the recommended first reading route
- **AND** secondary expansion paths are visually deferred

### Requirement: Map page acts as a stage router

The map page MUST help users choose the current stage and the first module of that stage before exploring branches.

#### Scenario: Visitor opens the learning map

- **WHEN** a visitor opens `/map`
- **THEN** each stage highlights its entry module
- **AND** branch content is positioned as secondary
- **AND** the page does not compete with the chapter page for evidence reading

### Requirement: Chapter pages preserve a focused reading rhythm

Chapter pages MUST guide readers through conclusion, visual model, explanation, and evidence in that order.

#### Scenario: Visitor opens a chapter page

- **WHEN** a visitor opens `/learn/[slug]`
- **THEN** the page shows a clear reading rhythm before deep evidence
- **AND** sidebar navigation stays lightweight
- **AND** evidence access remains available without dominating first-screen attention
