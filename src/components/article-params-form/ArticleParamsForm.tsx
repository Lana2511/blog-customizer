import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ArticleStateType, OptionType, defaultArticleState } from 'src/constants/articleProps';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import clsx from 'clsx';

interface IArticleParamsFormProps {
	onSubmit: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({onSubmit}: IArticleParamsFormProps) => {
	const asideRef = useRef<HTMLDivElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [currentSettings, setCurrentSettings] = useState<ArticleStateType>(defaultArticleState);

	const changeSetting = (settingName: string, value: OptionType) => {
		setCurrentSettings({...currentSettings, [settingName]: value});
	};

	const toggleSidebar = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
			setIsSidebarOpen(false);
		}
	};

	useEffect(() => {
		if (isSidebarOpen) {
			document.body.style.overflow = 'hidden';
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside className={clsx(styles.container, isSidebarOpen && styles.container_open)} ref={asideRef} >
				<form className={styles.form}
					  onSubmit={(event) => {
						  event.preventDefault();
						  onSubmit(currentSettings);
					  }}
					  onReset={() => {
						  setCurrentSettings(defaultArticleState);
						  onSubmit(defaultArticleState);
					  }} >
					<Text uppercase={true} weight={800} size={31} children={'Задайте параметры'} />
					<Select title='Шрифт'
							selected={currentSettings.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(value) => changeSetting('fontFamilyOption', value)} />
					<RadioGroup title='Размер шрифта' name='fontSizeOption'
								selected={currentSettings.fontSizeOption}
								options={fontSizeOptions}
								onChange={(value) => changeSetting('fontSizeOption', value)} />
					<Select title='Цвет шрифта'
							selected={currentSettings.fontColor}
							options={fontColors}
							onChange={(value) => changeSetting('fontColor', value)} />
					<Separator />
					<Select title='Цвет фона'
							selected={currentSettings.backgroundColor}
							options={backgroundColors}
							onChange={(value) => changeSetting('backgroundColor', value)} />
					<Select title='Ширина контента'
							selected={currentSettings.contentWidth}
							options={contentWidthArr}
							onChange={(value) => changeSetting('contentWidth', value)} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
