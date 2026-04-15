# Scalability Note

## Overview
This project is designed as a modular full-stack RBAC task management system with secure authentication, role-based authorization, and task assignment capabilities.

The current implementation is built to satisfy assignment requirements while also following a structure that can scale for future features and higher traffic.

---

## Current Design Choices

### 1. Versioned API
The backend uses a versioned route structure:

```text
/api/v1