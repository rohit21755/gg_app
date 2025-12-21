import SubmissionCard from "../taskcardcompleted"
export default function CompletedTask(){
    return(
        <>
        <SubmissionCard
  title="Glossier"
  description="Leave your Glossier Product review on social media, whatever platforms you have"
  image={require('@/assets/images/vibe.png')}
  responses={247}
  points={10}
/>

    </>)
}