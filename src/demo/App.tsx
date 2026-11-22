import { useState } from 'react';
import { Badge, Button, Card, Container, Input } from '../components';

/** Development playground (not part of the published package). */
export function App() {
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
  };

  const fakeSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <Container as="main" size="md">
      <h1>Dhanush Design System</h1>
      <p>Week 1 foundation: tokens, CSS layers and five core components.</p>
      <Button variant="secondary" onClick={toggleTheme}>
        Switch to {dark ? 'light' : 'dark'} theme
      </Button>

      <h2>Button</h2>
      <p style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button disabled>Disabled</Button>
        <Button loading={loading} onClick={fakeSave}>
          {loading ? 'Saving…' : 'Click to load'}
        </Button>
      </p>

      <h2>Badge</h2>
      <p style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Badge>Neutral</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
      </p>

      <h2>Input and Card</h2>
      <Card title="Create account" headingLevel={3} raised footer={<Button>Continue</Button>}>
        <div style={{ display: 'grid', gap: 16 }}>
          <Input label="Email" type="email" hint="We never share your email." required />
          <Input label="Username" error="That username is taken." defaultValue="dhanush" />
        </div>
      </Card>
    </Container>
  );
}
