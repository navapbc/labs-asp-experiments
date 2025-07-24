# Mastra Web Automation Memory Architecture

This document outlines the memory schema and architecture implemented in the web automation system.

## Overview

The web automation system uses a sophisticated memory architecture that enables:
- Cross-session persistence
- Semantic recall of past interactions
- Working memory for user preferences
- Conversation history tracking
- MCP tool call memory (Exa + Playwright)

## Memory Flow Architecture

```mermaid
graph TB
    subgraph "User Interaction"
        U[User] --> WF[Web Automation Workflow]
    end

    subgraph "Workflow Steps"
        WF --> NS[Navigation Step]
        NS --> APS[Action Planning Step]
        APS --> AES[Action Execution Step]
        AES --> CS[Completion Step]
    end

    subgraph "Session Management"
        NS --> STI[sessionThreadId Creation]
        STI --> RID[resourceId: 'web-automation-user']
        STI --> TID[threadId: session-specific]
    end

    subgraph "Web Automation Agent"
        NS --> WAA[Web Automation Agent]
        APS --> WAA
        AES --> WAA
        WAA --> MC[Memory Calls]
    end

    subgraph "Memory System"
        MC --> MEM[Memory Instance]
        MEM --> LS[LibSQL Storage]
        MEM --> VS[Vector Store]
        MEM --> WM[Working Memory]
        MEM --> SR[Semantic Recall]
    end

    subgraph "MCP Tools"
        WAA --> EXA[Exa Search]
        WAA --> PW[Playwright Actions]
        EXA --> MEM
        PW --> MEM
    end

    subgraph "Memory Types"
        WM --> UP[User Preferences]
        WM --> AP[Automation Patterns]
        SR --> PI[Past Interactions]
        SR --> WS[Website-Specific Memory]
        LS --> CH[Conversation History]
        LS --> EM[Embedded Messages]
    end

    style MEM fill:#e1f5fe
    style LS fill:#f3e5f5
    style VS fill:#e8f5e8
    style WM fill:#fff3e0
    style SR fill:#fce4ec
```

## Memory Components

### 1. Storage Layer
```mermaid
graph LR
    subgraph "LibSQL Database (mastra-memory.db)"
        T[Threads Table]
        M[Messages Table]
        WM[Working Memory Table]
        E[Embeddings Table]
    end

    subgraph "Vector Store"
        V[LibSQLVector]
        EM[Embedded Messages]
    end

    T --> M
    M --> E
    E --> V
    V --> EM
```

### 2. Memory Configuration Schema
```mermaid
graph TD
    subgraph "Memory Configuration"
        MC[Memory Class] --> ST[Storage: LibSQLStore]
        MC --> VS[Vector: LibSQLVector]
        MC --> EMB[Embedder: text-embedding-3-large]
        MC --> OPT[Options]
    end

    subgraph "Options Configuration"
        OPT --> LM[lastMessages: 10]
        OPT --> WM[workingMemory]
        OPT --> SR[semanticRecall]
    end

    subgraph "Working Memory Config"
        WM --> WME[enabled: true]
        WM --> WMS[scope: 'resource']
        WM --> WMT[template: structured]
    end

    subgraph "Semantic Recall Config"
        SR --> SRT[topK: 3]
        SR --> SRM[messageRange: 2]
    end
```

## Memory Flow Through Workflow

### 1. Session Initialization
```mermaid
sequenceDiagram
    participant U as User
    participant WF as Workflow
    participant NS as Navigation Step
    participant WAA as Web Automation Agent
    participant MEM as Memory System

    U->>WF: Start workflow with URL + objective
    WF->>NS: Execute navigation step
    NS->>NS: Generate sessionThreadId
    Note over NS: sessionThreadId = web-automation-{url}-{timestamp}
    NS->>WAA: Call agent with memory context
    WAA->>MEM: Store conversation with resourceId + threadId
    MEM-->>WAA: Return response with memory context
    WAA-->>NS: Navigation analysis + memories
```

### 2. Cross-Step Memory Continuity
```mermaid
sequenceDiagram
    participant NS as Navigation Step
    participant APS as Action Planning Step
    participant AES as Action Execution Step
    participant MEM as Memory System

    NS->>APS: Pass sessionThreadId
    APS->>MEM: Query with same resourceId + threadId
    MEM-->>APS: Retrieve relevant memories
    APS->>AES: Pass sessionThreadId + action
    AES->>MEM: Store action results with context
    MEM-->>AES: Confirm storage + recall patterns
```

## Memory Types and Usage

### 1. Working Memory
Stores structured user preferences and patterns:
```
- **Name**: User's preferred language
- **Description**: Language preference for web interactions
- **Value**: Spanish

- **Name**: Default address
- **Description**: User's primary address for form filling
- **Value**: 123 Main St, City, State, ZIP
```

### 2. Semantic Recall
Enables retrieval of relevant past interactions:
- Website-specific automation patterns
- Successful form completion strategies
- Error resolution methods
- User interaction preferences

### 3. Conversation History
Maintains chronological record:
- Last 10 messages per thread
- Cross-session conversation linking
- Context preservation between workflow runs

## MCP Tool Memory Integration

### 1. Exa Search Memory
```mermaid
graph LR
    subgraph "Exa Research Memory"
        ER[Exa Research] --> RM[Research Results]
        RM --> SM[Stored in Memory]
        SM --> FR[Future Recall]
    end

    subgraph "Memory Context"
        FR --> SP[Service Patterns]
        FR --> OI[Organization Info]
        FR --> AP[Application Processes]
    end
```

### 2. Playwright Action Memory
```mermaid
graph LR
    subgraph "Playwright Memory"
        PA[Playwright Actions] --> WS[Website Snapshots]
        PA --> EI[Element Interactions]
        PA --> FF[Form Fills]
    end

    subgraph "Stored Patterns"
        WS --> WSM[Website-Specific Memory]
        EI --> IM[Interaction Methods]
        FF --> FS[Form Strategies]
    end
```

## Key Features

### ✅ Cross-Session Persistence
- Same `resourceId` across different workflow runs
- Memories persist between sessions
- User preferences maintained long-term

### ✅ Workflow Memory Continuity  
- Single `sessionThreadId` across all workflow steps
- Each step builds on previous step's memory
- Context flows seamlessly through the workflow

### ✅ MCP Tool Memory
- Exa search results are remembered
- Playwright actions and patterns stored
- Research findings persist for future use

### ✅ Intelligent Recall
- Semantic search finds relevant past interactions
- Working memory provides structured data access
- Conversation history maintains chronological context

## Usage Examples

### Example 1: Cross-Session Memory
```typescript
// Session 1
workflow.start({ 
  url: 'bank.com', 
  objective: 'My preferred language is Spanish. Check account balance.' 
});

// Session 2 (days later)
workflow.start({ 
  url: 'bank.com', 
  objective: 'Login to account' 
});
// Agent remembers: "I recall you prefer Spanish from our previous session"
```

### Example 2: Website Pattern Learning
```typescript
// First visit to complex website
workflow.start({ 
  url: 'complex-gov-site.gov', 
  objective: 'Apply for service' 
});
// Agent learns: "For this site, must click 'Advanced Options' first"

// Future visits
workflow.start({ 
  url: 'complex-gov-site.gov', 
  objective: 'Check application status' 
});
// Agent applies: "Based on previous experience, clicking Advanced Options..."
```

## Technical Implementation

### Resource Identification
- **resourceId**: `'web-automation-user'` (consistent across all sessions)
- **threadId**: `web-automation-{sanitized-url}-{timestamp}` (per workflow session)

### Memory Storage Path
- **Database**: `file:../mastra-memory.db`
- **Vector Embeddings**: LibSQLVector with text-embedding-3-large
- **Scope**: Resource-level working memory

### Agent Model
- **Model**: `gpt-4.1` (upgraded for better memory utilization)
- **Tools**: MCP tools (Exa + Playwright) with memory context
- **Instructions**: Enhanced with memory-aware guidelines

This architecture enables the web automation system to become progressively smarter and more personalized with each interaction, remembering user preferences, successful patterns, and learning from past experiences. 