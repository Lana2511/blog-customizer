import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleSetting, setArticleSetting] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleSetting.fontFamilyOption.value,
					'--font-size': articleSetting.fontSizeOption.value,
					'--font-color': articleSetting.fontColor.value,
					'--container-width': articleSetting.contentWidth.value,
					'--bg-color': articleSetting.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleSetting={setArticleSetting} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
