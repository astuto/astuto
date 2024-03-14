import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import Button from '../../common/Button';
import HttpStatus from '../../../constants/http_status';
import {
  TENANT_SETTING_BRAND_DISPLAY_NAME_AND_LOGO,
  TENANT_SETTING_BRAND_DISPLAY_NAME_ONLY,
  TENANT_SETTING_BRAND_DISPLAY_LOGO_ONLY,
  TENANT_SETTING_BRAND_DISPLAY_NONE,
  TENANT_SETTING_COLLAPSE_BOARDS_IN_HEADER_NO_COLLAPSE,
  TENANT_SETTING_COLLAPSE_BOARDS_IN_HEADER_ALWAYS_COLLAPSE,
} from '../../../interfaces/ITenantSetting';
import { DangerText, SmallMutedText } from '../../common/CustomTexts';
import { getLabel, getValidationMessage } from '../../../helpers/formUtils';
import IBoardJSON from '../../../interfaces/json/IBoard';

export interface ISiteSettingsGeneralForm {
  siteName: string;
  siteLogo: string;
  brandDisplaySetting: string;
  locale: string;
  showVoteCount: boolean;
  showVoteButtonInBoard: boolean;
  showPoweredBy: boolean;
  rootBoardId?: string;
  showRoadmapInHeader: boolean;
  collapseBoardsInHeader: string;
}

interface Props {
  originForm: ISiteSettingsGeneralForm;
  boards: IBoardJSON[];
  authenticityToken: string;

  areUpdating: boolean;
  error: string;

  updateTenant(
    siteName: string,
    siteLogo: string,
    brandDisplaySetting: string,
    locale: string,
    rootBoardId: number,
    showRoadmapInHeader: boolean,
    collapseBoardsInHeader: string,
    showVoteCount: boolean,
    showVoteButtonInBoard: boolean,
    showPoweredBy: boolean,
    authenticityToken: string
  ): Promise<any>;
}

const GeneralSiteSettingsP = ({
  originForm,
  boards,
  authenticityToken,

  areUpdating,
  error,
  updateTenant,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitSuccessful, errors }
  } = useForm<ISiteSettingsGeneralForm>({
    defaultValues: {
      siteName: originForm.siteName,
      siteLogo: originForm.siteLogo,
      brandDisplaySetting: originForm.brandDisplaySetting,
      locale: originForm.locale,
      showVoteCount: originForm.showVoteCount,
      showVoteButtonInBoard: originForm.showVoteButtonInBoard,
      showPoweredBy: originForm.showPoweredBy,
      rootBoardId: originForm.rootBoardId,
      showRoadmapInHeader: originForm.showRoadmapInHeader,
      collapseBoardsInHeader: originForm.collapseBoardsInHeader,
    },
  });
  
  const onSubmit: SubmitHandler<ISiteSettingsGeneralForm> = data => {
    updateTenant(
      data.siteName,
      data.siteLogo,
      data.brandDisplaySetting,
      data.locale,
      Number(data.rootBoardId),
      data.showRoadmapInHeader,
      data.collapseBoardsInHeader,
      data.showVoteCount,
      data.showVoteButtonInBoard,
      data.showPoweredBy,
      authenticityToken
    ).then(res => {
      if (res?.status !== HttpStatus.OK) return;
      window.location.reload();
    });
  };

  return (
    <>
      <Box>
        <h2>{ I18n.t('site_settings.general.title') }</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formRow">
            <div className="formGroup col-4">
              <label htmlFor="siteName">{ getLabel('tenant', 'site_name') }</label>
              <input
                {...register('siteName', { required: true })}
                id="siteName"
                className="formControl"
              />
              <DangerText>{errors.siteName && getValidationMessage(errors.siteName.type, 'tenant', 'site_name')}</DangerText>
            </div>

            <div className="formGroup col-4">
              <label htmlFor="siteLogo">{ getLabel('tenant', 'site_logo') }</label>
              <input
                {...register('siteLogo')}
                id="siteLogo"
                className="formControl"
              />
            </div>

            <div className="formGroup col-4">
              <label htmlFor="brandSetting">{ getLabel('tenant_setting', 'brand_display') }</label>
              <select
                {...register('brandDisplaySetting')}
                id="brandSetting"
                className="selectPicker"
              >
                <option value={TENANT_SETTING_BRAND_DISPLAY_NAME_AND_LOGO}>
                  { I18n.t('site_settings.general.brand_setting_both') }
                </option>
                <option value={TENANT_SETTING_BRAND_DISPLAY_NAME_ONLY}>
                  { I18n.t('site_settings.general.brand_setting_name') }
                </option>
                <option value={TENANT_SETTING_BRAND_DISPLAY_LOGO_ONLY}>
                  { I18n.t('site_settings.general.brand_setting_logo') }
                </option>
                <option value={TENANT_SETTING_BRAND_DISPLAY_NONE}>
                  { I18n.t('site_settings.general.brand_setting_none') }
                </option>
              </select>
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="locale">{ getLabel('tenant', 'locale') }</label>
            <select
              {...register('locale')}
              id="locale"
              className="selectPicker"
            >
              <option value="en">🇬🇧 English</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="es">🇪🇸 Español</option>
              <option value="zh-CN">🇨🇳 中文</option>
              <option value="ru">🇷🇺 Русский</option>
              <option value="vi">🇻🇳 Tiếng Việt</option>
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="rootBoardId">{ getLabel('tenant_setting', 'root_board_id') }</label>
            <select
              {...register('rootBoardId')}
              id="rootBoardId"
              className="selectPicker"
            >
              <option value="0">
                {I18n.t('roadmap.title')}
              </option>
              <optgroup label={getLabel('board')}>
                {boards.map((board, i) => (
                  <option value={board.id} key={i}>{board.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <br />
          <h4>{ I18n.t('site_settings.general.subtitle_header') }</h4>
          
          <div className="formGroup">
            <div className="checkboxSwitch">
              <input {...register('showRoadmapInHeader')} type="checkbox" id="show_roadmap_in_header" />
              <label htmlFor="show_roadmap_in_header">{ getLabel('tenant_setting', 'show_roadmap_in_header') }</label>
            </div>
          </div>
          
          <br />
          <div className="formGroup">
            <label htmlFor="collapseBoardsInHeader">{ getLabel('tenant_setting', 'collapse_boards_in_header') }</label>
              <select
                {...register('collapseBoardsInHeader')}
                id="collapseBoardsInHeader"
                className="selectPicker"
              >
                <option value={TENANT_SETTING_COLLAPSE_BOARDS_IN_HEADER_NO_COLLAPSE}>
                  { I18n.t('site_settings.general.collapse_boards_in_header_no_collapse') }
                </option>
                <option value={TENANT_SETTING_COLLAPSE_BOARDS_IN_HEADER_ALWAYS_COLLAPSE}>
                  { I18n.t('site_settings.general.collapse_boards_in_header_always_collapse') }
                </option>
              </select>
          </div>

          <br />
          <h4>{ I18n.t('site_settings.general.subtitle_visibility') }</h4>

          <div className="formGroup">
            <div className="checkboxSwitch">
              <input {...register('showVoteCount')} type="checkbox" id="show_vote_count_checkbox" />
              <label htmlFor="show_vote_count_checkbox">{ getLabel('tenant_setting', 'show_vote_count') }</label>
              <SmallMutedText>
                { I18n.t('site_settings.general.show_vote_count_help') }
              </SmallMutedText>
            </div>
          </div>

          <br />

          <div className="formGroup">
            <div className="checkboxSwitch">
              <input {...register('showVoteButtonInBoard')} type="checkbox" id="show_vote_button_in_board_checkbox" />
              <label htmlFor="show_vote_button_in_board_checkbox">{ getLabel('tenant_setting', 'show_vote_button_in_board') }</label>
              <SmallMutedText>
                { I18n.t('site_settings.general.show_vote_button_in_board_help') }
              </SmallMutedText>
            </div>
          </div>

          <br />

          <div className="formGroup">
            <div className="checkboxSwitch">
              <input {...register('showPoweredBy')} type="checkbox" id="show_powered_by_checkbox" />
              <label htmlFor="show_powered_by_checkbox">{ getLabel('tenant_setting', 'show_powered_by') }</label>
            </div>
          </div>

          <br />

          <Button onClick={() => null} disabled={!isDirty}>
            {I18n.t('common.buttons.update')}
          </Button>
        </form>
      </Box>

      <SiteSettingsInfoBox
        areUpdating={areUpdating}
        error={error}
        areDirty={isDirty && !isSubmitSuccessful}
      />
    </>
  );
}

export default GeneralSiteSettingsP;
