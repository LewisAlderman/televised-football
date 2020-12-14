import useWindowResize from 'hooks/useWindowResize';
import { useState } from 'react';

/**
 * @param {Object} props 
 * @param {import('@data/index').Match[]} props.items 
 */

export default function Matches ({items}) {	
	console.log(items)

	const [imgSize, setImgSize] = useState('100px');
	
	useWindowResize((w) => {
		console.log('width:', w.innerWidth)

		if (w.innerWidth >= 1536) setImgSize('130px');
		else if (w.innerWidth <= 640) setImgSize('85px');
		else setImgSize('100px');
	});
	
	if (!items) return null;
	
	return (
		<div className="mt-12 mb-40 space-y-8 sm:space-y-10 md:space-y-12">
			{items.map(({teams, channels, competition, time, event}, i) => {
				const [homeTeam, awayTeam] = teams;
				const prevDiffTime = i === 0 || items[i-1].time !== time;
				const nextSameTime = items[i+1]?.time === time;
				
				return (
					<div key={teams.join() + "_" + event}>
						<div className="flex flex-wrap sm:flex-nowrap">
							{/**
							 * Time
							 */}
							<div className='w-24 md:w-28 xl:w-36 sm:mt-1 md:mt-2'>
								<div className="relative w-full h-full">
									{/* text */}
									{Boolean(i === 0 || prevDiffTime) && (
										<p className="relative z-10 text-xs leading-10 uppercase sm:text-sm text-blueGray-500">{time}</p>
									)}
									{/* vertical bar */}
									<div className={
										`absolute bottom-0 top-0 left-6 w-0.5 bg-blueGray-200 rounded-sm ${nextSameTime ? 'top-0 -bottom-16' : 'bottom-4'} ${!prevDiffTime && !nextSameTime ? 'max-h-8' : prevDiffTime && !nextSameTime ? 'max-h-16' : ''}`
									} />
									{/* dash */}
									<div className="absolute w-3 h-0.5 bg-blueGray-200 rounded-full left-6 top-8" />
								</div>
							</div>
								
							<div className="flex flex-col flex-1 sm:flex-row">
								{/**
								 * Team names
								 */}
								<div className="flex-1 space-y-2">
									{!!homeTeam && <p className="text-xl font-bold tracking-wide uppercase 2xl:text-2xl md:text-2xl text-blueGray-900">{homeTeam}</p>}
									{!!awayTeam && <p className="text-xl font-bold tracking-wide uppercase 2xl:text-2xl md:text-2xl text-blueGray-900">{awayTeam}</p>}
	
									{event && (
										<p className="text-xs font-medium tracking-wide sm:text-sm text-blueGray-700 rounded-full bg-blueGray-400 inline-block px-3 py-0.5">{event}</p>
									)}
	
									{/* competition */}
									<p className="text-sm font-normal md:text-base text-warmGray-500"> {competition} </p>
								</div>
	
								{/**
								 * Channels
								 */}
								<div className="mt-4 sm:mt-0 sm:ml-6">
									<div className="flex flex-wrap items-center sm:flex-nowrap sm:space-y-2 sm:flex-col">
											{channels.map(({src, title}) => {
												return (
													<div className="mb-1 mr-2 sm:mr-0 sm:mb-0" key={title}>
														<img src={src} alt={title} title={title} loading="lazy" width={imgSize} height={title.match(/now\s?tv/i) ? "35px" : "19px"} className="transform-gpu blend-mode-darken" />
													</div>
												)
											})}
										</div>
								</div>
							</div>

						</div>
					</div>
				)
			})}
		</div>
	)
}