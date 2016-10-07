function g = sigmoid(z)
%SIGMOID Compute sigmoid functoon
%   J = SIGMOID(z) computes the sigmoid of z.

g = zeros(size(z));
negativeZ = -z;
exponent = e .^ negativeZ;
ones = ones(size(z));
g = ones ./ (ones .+ (exponent));
end
