import { useState, useEffect } from "react";

// static async void Ramp() {
//   var url = "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";
//   var client = new HttpClient();
//   var response = await client.GetAsync(url);
//   var content = await response.Content.ReadAsStringAsync();
//   var doc = new HtmlDocument();
//   doc.LoadHtml(content);

//   var body = doc.DocumentNode.SelectSingleNode("//body");
//   Debug.Assert(body != null, "failed to get body node");

//   var codeNodes = body.SelectNodes("./code[@data-class]");
//   Console.WriteLine(codeNodes.Count);

//   var divNodes = codeNodes.SelectMany(c => {
//       return c.SelectNodes("./div[@data-tag]");
//   }).Where(c => c != null);

//   Console.WriteLine(divNodes.Count());

//   var spanNodes = divNodes.SelectMany(s => {
//       return s.SelectNodes("./span[@data-id]");
//   }).Where(s => s != null);
//   Console.WriteLine(spanNodes.Count());

//   var chars = spanNodes.SelectMany(s => {
//       return s.SelectNodes("./i[@class='ramp char']");
//   }).Where(s => s != null).Select(s => {
//       return s.GetAttributeValue("value", "");
//   }).ToList();
//   Console.WriteLine(chars.Count);

//   string s = chars.Aggregate("", (acc, c) => {
//       return acc + c;
//   });

//   Console.WriteLine(s);
// }

export type TypeWriterProps = {
  text: string,
  frequency: number,
};

function App() {
  function TypeWriter(props: TypeWriterProps) {
    const [cursor, setCursor] = useState(-1);
    const chars = props.text.split("");

    useEffect(() => {
      for (var i = 0; i < props.text.length; i++) {
        const j = i;
        const delay = (j + 1) * props.frequency;
        setTimeout(() => {
          setCursor(j);
        }, delay);
      }

      return () => {
        setCursor(-1);
      };
    }, [props.text, props.frequency]);

    return (
      <>
        {chars.map((char, index) => {
          if (index <= cursor) {
            return <span key={index}>{char}</span>;
          } else {
            return <span key={index}></span>;
          }
        })}
      </>
    );
  }

  function Flag() {
    const [isLoading, setIsLoading] = useState(true);
    const [flagText, setFlagText] = useState("");

    try {
      fetch(
        "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/676c75",
        {
          method: "GET",
        }
      ).then(async (res) => {
        const flag = await res.text();
        setFlagText(flag);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }

    if (isLoading === true) {
      return <>Loading...</>;
    } else {
      return (
        <>
          <TypeWriter text={flagText} frequency={500}></TypeWriter>
        </>
      );
    }
  }

  return (
    <>
      <Flag />
    </>
  );
}

export default App;
