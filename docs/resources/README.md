---
displayed_sidebar: resourcesSidebar
---

# Resources

> Shared tools, tutorials, and references for all projects.

## Development Environment

### Recommended Tools

| Tool | Purpose | Link |
|------|---------|------|
| VS Code | Code editor | [Download](https://code.visualstudio.com/) |
| PlatformIO | Embedded development | [Install](https://platformio.org/) |
| Docker Desktop | Containerization | [Download](https://www.docker.com/products/docker-desktop/) |
| Git | Version control | [Download](https://git-scm.com/) |
| Node.js | JavaScript runtime | [Download](https://nodejs.org/) |

### VS Code Extensions

**Essential:**
- ESLint
- Prettier
- GitLens
- Docker
- PlatformIO IDE

**Recommended:**
- Remote - SSH
- Thunder Client
- Error Lens
- TODO Highlight

## Learning Resources

### Electronics & Embedded
- [Arduino Documentation](https://docs.arduino.cc/)
- [ESP32 Programming Guide](https://docs.espressif.com/projects/esp-idf/en/latest/)
- [KiCad Tutorials](https://www.kicad.org/help/learning-resources/)

### Software Development
- [The Odin Project](https://www.theodinproject.com/)
- [freeCodeCamp](https://www.freecodecamp.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

### DevOps
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

## Team Standards

### Git Workflow

```
main (production)
  └── develop (integration)
        ├── feature/xxx
        ├── bugfix/xxx
        └── hotfix/xxx
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(auth): add login functionality
fix(api): resolve timeout issue
docs(readme): update installation steps
refactor(utils): simplify helper functions
```

### Code Review Checklist

- [ ] Code compiles without warnings
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No hardcoded secrets
- [ ] Error handling implemented
- [ ] Follows project style guide

## Communication

### Channels
- **Discord**: Daily communication
- **GitHub Issues**: Bug reports and features
- **GitHub Discussions**: Questions and ideas

### Meeting Schedule
- Weekly standup: Monday 10:00 AM
- Sprint planning: First Monday of month
- Retrospective: Last Friday of month

## Project Templates

### Hardware Project
```
project-name/
├── hardware/
│   ├── kicad/
│   ├── gerbers/
│   └── bom/
├── firmware/
│   ├── src/
│   ├── include/
│   └── platformio.ini
├── docs/
│   ├── datasheet/
│   └── assembly/
└── README.md
```

### Software Project
```
project-name/
├── src/
├── tests/
├── docs/
├── .github/
│   └── workflows/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```
