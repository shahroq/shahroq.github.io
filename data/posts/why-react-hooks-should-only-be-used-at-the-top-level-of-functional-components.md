---
id: 201
title: "Why React Hooks should only be used at the top level of functional components"
excerpt: "React hooks should only be used at the top level (root) of a functional component or custom hook — not inside loops, conditions, or nested functions. This is a core rule of React hooks."
published_date: "2023-04-06"
tags: ["React", "Hooks"]
---

React hooks should only be used at the top level (root) of a functional component or custom hook — not inside loops, conditions, or nested functions. This is a core rule of React hooks. Here's why:

1. **Consistent Hook Order means Stable State**

React relies on the order in which hooks are called to associate them with state and effects. For example:

```jsx
function MyComponent() {
  const [count, setCount] = useState(0); // 1st hook
  const [name, setName] = useState(""); // 2nd hook
}
```

in This scenario, React knows:

- 1st call → count
- 2nd call → name

If this rule were violated, e.g., put a hook inside a conditional:

```jsx
if (someCondition) {
  useState(123);
}
```

Then the number and order of hooks can change between renders, which breaks React’s internal hook tracking, leading to bugs.

2. **Avoiding Conditional Hook Execution**

Hooks must be called unconditionally, every time the component renders, to ensure React’s internal hook state is consistent:

```jsx
// incorrect
function Component() {
  if (user.isLoggedIn) {
    useEffect(() => {
      console.log("User is logged in");
    }, []);
  }
}

// correct
function Component() {
  useEffect(() => {
    if (user.isLoggedIn) {
      console.log("User is logged in");
    }
  }, []);
}
```

3. **Custom Hooks Must Follow the Same Rule**

When you create your own custom hooks, the same rule applies — call them at the top level of your component or other hooks.

```jsx
// incorrect
function Component() {
  function doSomething() {
    useMyCustomHook(); // Can't call a hook inside another function
  }
}
// correct
function Component() {
  const result = useMyCustomHook(); // Top level
}
```
