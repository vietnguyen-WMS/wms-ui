import { useState } from 'react';
import { Accordion, Drawer, Button } from '@components/ui';

const Guest = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="p-4 space-y-4">
      <h1>Guest</h1>

      <Accordion title="Accordion Title">
        <p>Accordion Content</p>
      </Accordion>

      <Button onClick={handleOpen}>Open Drawer</Button>

      <Drawer isOpen={open} onClose={handleClose}>
        <Drawer.Header>
          <Drawer.Title>Guest Drawer</Drawer.Title>
          <Drawer.CloseTrigger />
        </Drawer.Header>
        <Drawer.Body>
          <p>Drawer Content</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={handleClose}>Close Drawer</Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default Guest;
