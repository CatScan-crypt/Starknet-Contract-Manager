import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const aliases = {
    ERC20Generator: resolve(__dirname, 'src/components/erc20Generator/ERC20Generator.tsx'),
    Header: resolve(__dirname, 'src/components/layout/Header.tsx'),
    Footer: resolve(__dirname, 'src/components/layout/Footer.tsx'),
    erc20GeneratorTypes: resolve(__dirname, 'src/components/erc20Generator/erc20Generator.types.ts'),
    ToggleCard: resolve(__dirname, 'src/components/erc20Generator/ToggleCard.tsx'),
    ConfiguredBasicPropertiesStep: resolve(__dirname, 'src/components/erc20Generator/Configs/ConfiguredBasicPropertiesStep.tsx'),
    ConfiguredProtectionStep: resolve(__dirname, 'src/components/erc20Generator/Configs/ConfiguredProtectionStep.tsx'),
    ConfiguredRatesStep: resolve(__dirname, 'src/components/erc20Generator/Configs/ConfiguredRatesStep.tsx'),
    ConfiguredSummaryStep: resolve(__dirname, 'src/components/erc20Generator/Configs/ConfiguredSummaryStep.tsx'),
    StepNavigation: resolve(__dirname, 'src/components/erc20Generator/nav/StepNavigation.tsx'),
    AnimatedStepContent: resolve(__dirname, 'src/components/erc20Generator/animation/AnimatedStepContent.tsx'),
    animationVariants: resolve(__dirname, 'src/components/erc20Generator/animation/animationVariants.tsx'),
    navSteps: resolve(__dirname, 'src/components/erc20Generator/constants/erc20Generator.constants.ts'),
    useERC20Form: resolve(__dirname, 'src/components/erc20Generator/hooks/useERC20Form.ts'),
    useDexManagement: resolve(__dirname, 'src/components/erc20Generator/hooks/useDexManagement.ts'),
};
