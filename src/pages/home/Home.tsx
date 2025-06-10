import { Button, Dropdown } from "@/components/ui";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Dropdown>
        <Dropdown.Trigger>
          <Button>Open Menu</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => console.log("Item 1")}>
            Item 1
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log("Item 2")}>
            Item 2
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Home;
