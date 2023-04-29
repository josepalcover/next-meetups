import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of amazing meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  let loadedMeetups = [];
  try {
    const response = await fetch(
      "https://react-http-eb5ba-default-rtdb.europe-west1.firebasedatabase.app/meetups.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();

    // use the key as the id
    for (const key in data) {
      loadedMeetups.push({
        ...data[key],
        id: key,
      });
    }
  } catch (error) {
    setError(error.message);
  }

  return {
    props: {
      meetups: loadedMeetups,
    },
    revalidate: 10,
  };
}

export default HomePage;

// function executed during build process
// it will not run on the client
/*
export async function getStaticProps() {
  //fetch data or access files here
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10,
  };
}
*/
