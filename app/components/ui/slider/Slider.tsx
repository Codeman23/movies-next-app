import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import SlideArrow from './SlideArrow/SlideArrow';
import SlideItem from './SlideItem';
import styles from './Slider.module.scss';
import { ISlide } from './slider.interface';
import { useSlider } from './useSlider';

interface ISlider {
	slides: ISlide[];
	buttonTitle?: string;
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { handleClick, index, isNext, isPrev, slideIn } = useSlider(
		slides.length
	);

	return (
		<div className={styles.slider}>
			{isPrev && (
				<SlideArrow variant="left" clickHandler={() => handleClick('prev')} />
			)}

			<CSSTransition
				in={slideIn}
				timeout={300}
				classNames="slide-animation"
				unmountOnExit
			>
				<SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>

			{isNext && (
				<SlideArrow variant="right" clickHandler={() => handleClick('next')} />
			)}
		</div>
	);
};
export default Slider;
