import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

const MeetupDetailsPage = ({ meetupData }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail {...meetupData} />
    </>
  );
};

export async function getStaticPaths() {
  // we generate pages on build for the existing entries
  // in our database
  // for the future entries, pages will be generated on-demand

  // fetch all entries from our database
  let idList = [];
  try {
    const response = await fetch(
      `https://react-http-eb5ba-default-rtdb.europe-west1.firebasedatabase.app/meetups/${meetupId}.json`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();

    for (const key in data) {
      idList.push(key);
    }
  } catch (error) {
    console.log(error.message);
  }
  return {
    fallback: "blocking",

    paths: idList.map((id) => {
      params: {
        meetupId: id;
      }
    }),
  };
}

export async function getStaticProps(context) {
  //get the id from the URL
  const meetupId = context.params.meetupId;
  //fetch data of the specified ID
  let loadedMeetup = {};

  try {
    const response = await fetch(
      `https://react-http-eb5ba-default-rtdb.europe-west1.firebasedatabase.app/meetups/${meetupId}.json`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    console.log("----------");

    // add the ID to the meetup object (needed for the component)
    loadedMeetup = {
      ...data,
      id: meetupId,
    };
    console.log(loadedMeetup);
  } catch (error) {
    console.log(error.message);
  }

  return {
    props: {
      meetupData: loadedMeetup,
    },
  };
}

export default MeetupDetailsPage;
