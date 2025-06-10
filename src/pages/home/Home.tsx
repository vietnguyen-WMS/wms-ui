import { Button, Dropdown } from "@/components/ui";

const Home = () => {
  return (
    <>
      <h1 className="text-5xl py-3">Home</h1>
      <Dropdown>
        <Dropdown.Trigger>
          <Button>Open Menu</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => console.log("Item 1")}>
            Item option 1
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log("Item 2")}>
            Item curent 2
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log("Item 3")}>
            Item curent spcial 3
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log("Item 4")}>
            Item curent the 4
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Home;
