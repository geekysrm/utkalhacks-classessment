import * as tf from '@tensorflow/tfjs-core';
import { TfjsImageRecognitionBase } from 'tfjs-image-recognition-base';
export function extractorsFactory(extractWeights, paramMappings) {
    function extractSeparableConvParams(channelsIn, channelsOut, mappedPrefix) {
        var depthwise_filter = tf.tensor4d(extractWeights(3 * 3 * channelsIn), [3, 3, channelsIn, 1]);
        var pointwise_filter = tf.tensor4d(extractWeights(channelsIn * channelsOut), [1, 1, channelsIn, channelsOut]);
        var bias = tf.tensor1d(extractWeights(channelsOut));
        paramMappings.push({ paramPath: mappedPrefix + "/depthwise_filter" }, { paramPath: mappedPrefix + "/pointwise_filter" }, { paramPath: mappedPrefix + "/bias" });
        return new TfjsImageRecognitionBase.SeparableConvParams(depthwise_filter, pointwise_filter, bias);
    }
    var extractConvParams = TfjsImageRecognitionBase.extractConvParamsFactory(extractWeights, paramMappings);
    function extractDenseBlock3Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer) {
        if (isFirstLayer === void 0) { isFirstLayer = false; }
        var conv0 = isFirstLayer
            ? extractConvParams(channelsIn, channelsOut, 3, mappedPrefix + "/conv0")
            : extractSeparableConvParams(channelsIn, channelsOut, mappedPrefix + "/conv0");
        var conv1 = extractSeparableConvParams(channelsOut, channelsOut, mappedPrefix + "/conv1");
        var conv2 = extractSeparableConvParams(channelsOut, channelsOut, mappedPrefix + "/conv2");
        return { conv0: conv0, conv1: conv1, conv2: conv2 };
    }
    function extractDenseBlock4Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer) {
        if (isFirstLayer === void 0) { isFirstLayer = false; }
        var _a = extractDenseBlock3Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer), conv0 = _a.conv0, conv1 = _a.conv1, conv2 = _a.conv2;
        var conv3 = extractSeparableConvParams(channelsOut, channelsOut, mappedPrefix + "/conv3");
        return { conv0: conv0, conv1: conv1, conv2: conv2, conv3: conv3 };
    }
    return {
        extractDenseBlock3Params: extractDenseBlock3Params,
        extractDenseBlock4Params: extractDenseBlock4Params
    };
}
//# sourceMappingURL=extractorsFactory.js.map