import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  // http request to add meetup to firebase
  const addMeetupHandler = async (meetup) => {
    console.log(meetup);
    // mmetup is an object containing the info
    try {
      const response = await fetch(
        "https://react-http-eb5ba-default-rtdb.europe-west1.firebasedatabase.app/meetups.json",
        {
          method: "POST",
          body: JSON.stringify(meetup),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("failed to post");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }

    // navigate away
    router.push("/");
  };
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
