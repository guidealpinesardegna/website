import React, { useState } from "react";
import { Paragraph, TextLink, Flex, Note } from "@contentful/f36-components";

const Home = () => {
  const [state, setState] = useState(0);

  const handleClick = async () => {
    try {
      setState(1);
      await fetch(
        "https://api.netlify.com/build_hooks/67ae1db6cc5ae5d5558faf55",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      setState(2);

      // You can handle the response data here if needed
    } catch (error) {
      setState(-1);

      console.error("Error during POST request:", error);
    }
  };
  return (
    <Flex
      marginTop="spacingXl"
      justifyContent="center"
      flexDirection="column"
      gap="spacingS"
    >
      <Note
        title="Aggiornamento del sito"
        style={{ width: "400px", margin: "0 auto" }}
      >
        {state === 0 && (
          <Paragraph>
            <TextLink onClick={handleClick}>Aggiorna il sito ora</TextLink>
          </Paragraph>
        )}
        {state === 1 && <Paragraph>sto inviando la richiesta</Paragraph>}
        {state === 2 && (
          <Paragraph>
            Il sito si sta aggiornando, riceverai una notifica via email quando
            l’aggiornamento sarà finito.
          </Paragraph>
        )}
        {state === -1 && <Paragraph>Errore durante la richiesta</Paragraph>}
      </Note>
    </Flex>
  );
};

export default Home;
