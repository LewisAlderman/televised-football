import Cors from 'cors';
import { transformBody, URL } from '@data/index';
import Head from 'next/head'
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Main from '@components/Main';
import Matches from '@components/Matches';

// Functionality
// ======
// @TODO display total fixture count
// @TODO nav component
// @TODO footer component
// @TODO scroll-to-top
// @TODO filter checkboxes: mens | women | under Xs 
// @TODO search filter (team|competition|channel) (? could cmd+F)
// @TODO auto-scroll to nearest time (? perhaps annoying)
//
// Styling
// ======
// @TODO do something with dates formatting
// @TODO past/started match style
// @TODO auto-scroll to nearest time (? perhaps annoying)

/**
 * @param {Object} props 
 * @param {import('@data/index').Match[]} props.data 
 */

function Homepage(props) {    
  return (
    <>
      <Head>
        <title>WhensTheMatch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen ios-safari-full-height bg-blueGray-50 debug-screens">
        <Navigation/>

        <Main>
          <div className="max-w-screen-sm px-5 mx-auto sm:px-3 lg:max-w-screen-md md:px-0 2xl:max-w-screen-lg">
            <Matches items={props?.data}/>
          </div>
        </Main>
        
        <Footer/>
      </div>
    </>
  )
}

export async function getServerSideProps() {  
  const matches = await fetch(URL, {mode: Cors({methods: 'GET'})}).then(res => res.text()).then(body => {    
    const matches = transformBody(body);
    return matches;
  });
  
  return {
    props: {
      data: matches, 
    },
  }
}

export default Homepage;